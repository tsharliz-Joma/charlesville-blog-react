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

  if (!apiKey || !groupId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing MailerLite configuration.' })
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
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email is required.' })
    }
  }

  try {
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
