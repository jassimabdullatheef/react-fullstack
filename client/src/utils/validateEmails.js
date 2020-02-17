const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/

export default emails => {
  if (emails) {
    const invalidEmails = emails
      .split(',')
      .map(email => email.trim())
      .filter(email => !reg.test(email))

    console.log(invalidEmails)

    if (invalidEmails.length) {
      return `These emails are invalid: ${invalidEmails}`
    }
  }

  return null
}
