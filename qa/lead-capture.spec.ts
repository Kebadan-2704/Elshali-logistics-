import { test, expect } from '@playwright/test';

test.describe('Phase 1: Lead Capture & Multi-Channel Resilience API', () => {
  const validContact = {
    name: 'Suresh Kumar',
    email: 'suresh@enterprise.com',
    phone: '9876543210',
    message: 'Need full truckload tariff details for Coimbatore to Bangalore route.',
  };

  const validQuote = {
    pickupLocation: 'Coimbatore, TN',
    deliveryLocation: 'Chennai, TN',
    materialType: 'Automotive Components',
    weight: '12 MT',
    vehicleType: '24 Ft Container',
    requiredDate: '2026-11-20',
    fullName: 'Ramesh Sundaram',
    companyName: 'Apex Engineering Ltd',
    phone: '9443211234',
    email: 'ramesh@apexeng.in',
    additionalDetails: 'Requires tail-lift loading at Coimbatore facility.',
  };

  test('Contact API: returns 503 with fallback phone and WhatsApp when all channels fail', async ({ request }) => {
    const res = await request.post('/api/contact', {
      headers: {
        'x-mock-resend': 'false',
        'x-mock-telegram': 'false',
        'x-mock-webhook': 'false',
        'x-real-ip': '10.0.1.1',
      },
      data: validContact,
    });

    expect(res.status()).toBe(503);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain('temporarily unavailable');
    expect(body.fallbackContact).toBeDefined();
    expect(body.fallbackContact.phone).toBeTruthy();
    expect(body.fallbackContact.whatsapp).toBeTruthy();
  });

  test('Contact API: returns 200 when at least one durable channel succeeds', async ({ request }) => {
    const res = await request.post('/api/contact', {
      headers: {
        'x-mock-resend': 'true',
        'x-real-ip': '10.0.1.2',
      },
      data: validContact,
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.leadId).toBeDefined();
    expect(body.data.referenceId).toMatch(/^ELS-\d+/);
    expect(body.data.channels.resend).toBe(true);
  });

  test('Contact API: rejects invalid payload with 400', async ({ request }) => {
    const res = await request.post('/api/contact', {
      headers: { 'x-real-ip': '10.0.1.3' },
      data: {
        name: 'A', // too short (<2)
        email: 'invalid-email',
        phone: '12345', // invalid phone
        message: 'hi', // too short (<5)
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Validation failed');
    expect(body.details.length).toBeGreaterThan(0);
  });

  test('Contact API: rejects honeypot spam with 400', async ({ request }) => {
    const res = await request.post('/api/contact', {
      headers: { 'x-real-ip': '10.0.1.4' },
      data: {
        ...validContact,
        website: 'https://spam-bot.site',
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain('Spam');
  });

  test('Quote API: returns 503 with fallback phone and WhatsApp when all channels fail', async ({ request }) => {
    const res = await request.post('/api/quote', {
      headers: {
        'x-mock-resend': 'false',
        'x-mock-telegram': 'false',
        'x-mock-webhook': 'false',
        'x-real-ip': '10.0.2.1',
      },
      data: validQuote,
    });

    expect(res.status()).toBe(503);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.fallbackContact.phone).toBeTruthy();
    expect(body.fallbackContact.whatsapp).toBeTruthy();
  });

  test('Quote API: returns 200 when at least one durable channel succeeds', async ({ request }) => {
    const res = await request.post('/api/quote', {
      headers: {
        'x-mock-telegram': 'true',
        'x-real-ip': '10.0.2.2',
      },
      data: validQuote,
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.leadId).toBeDefined();
    expect(body.data.referenceId).toMatch(/^ELS-\d+/);
    expect(body.data.channels.telegram).toBe(true);
  });

  test('Quote API: rejects invalid payload with 400', async ({ request }) => {
    const res = await request.post('/api/quote', {
      headers: { 'x-real-ip': '10.0.2.3' },
      data: {
        pickupLocation: '',
        deliveryLocation: '',
        requiredDate: 'invalid-date',
        phone: '123',
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Validation failed');
  });

  test('Rate Limiting: triggers 429 after 5 requests from same IP within window', async ({ request }) => {
    const testIp = '198.51.100.99';
    let triggeredRateLimit = false;

    // Send 7 rapid requests from testIp
    for (let i = 0; i < 7; i++) {
      const res = await request.post('/api/contact', {
        headers: {
          'x-real-ip': testIp,
          'x-mock-resend': 'true',
        },
        data: validContact,
      });

      if (res.status() === 429) {
        triggeredRateLimit = true;
        const body = await res.json();
        expect(body.error).toContain('Too many contact inquiries');
        expect(res.headers()['retry-after']).toBe('60');
        break;
      }
    }

    expect(triggeredRateLimit).toBe(true);
  });
});
