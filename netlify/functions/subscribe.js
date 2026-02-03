export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ message: 'Method not allowed' })
    }
  }

  const apiKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_GROUP_ID
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
  const recaptchaMinScore = Number(process.env.RECAPTCHA_MIN_SCORE || '0.5')

  if (!apiKey || !groupId || !recaptchaSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing server configuration.' })
    }
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON payload.' })
    }
  }

  const email = (payload.email || '').trim()
  const recaptchaToken = (payload.recaptchaToken || '').trim()
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email is required.' })
    }
  }

  if (!recaptchaToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Captcha verification failed.' })
    }
  }

  try {
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: recaptchaToken
        }).toString()
      }
    )

    const recaptchaData = await recaptchaResponse.json()
    if (
      !recaptchaData.success ||
      recaptchaData.action !== 'subscribe' ||
      typeof recaptchaData.score !== 'number' ||
      recaptchaData.score < recaptchaMinScore
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Captcha verification failed.' })
      }
    }

    const response = await fetch(
      `https://connect.mailerlite.com/api/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          email,
          groups: [groupId]
        })
      }
    )

    if (!response.ok) {
      const errorBody = await response.text()
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: 'MailerLite rejected the request.',
          details: errorBody
        })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscribed' })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error.' })
    }
  }
}
