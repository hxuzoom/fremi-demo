 import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export interface ContactFormData {
	name: string
	email: string
	phone?: string
	message: string
}

export async function sendContactEmail(data: ContactFormData) {
	const recipient = process.env.EMAIL_RECIPIENT!

	const { error } = await resend.emails.send({
		from: 'FREMI Contact Form <onboarding@resend.dev>',
		to: recipient,
		subject: `New Contact Form Submission from ${data.name}`,
		html: `
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Contact Form Submission</title>
				</head>
				<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
					<table role="presentation" style="width: 100%; border-collapse: collapse;">
						<tr>
							<td style="padding: 40px 0; text-align: center; background-color: #000000;">
								<img src="https://fremi-demo.vercel.app/fremi.webp" alt="FREMI Logo" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
								<h1 style="margin: 20px 0 0 0; color: #ff6b35; font-size: 32px; font-weight: bold;">FREMI</h1>
								<p style="margin: 5px 0 0 0; color: #ffffff; font-size: 14px;">Pålitelig maskinentreprenør</p>
							</td>
						</tr>
						<tr>
							<td style="padding: 40px 20px;">
								<table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
									<tr>
										<td style="padding: 40px;">
											<h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: bold;">New Contact Form Submission</h2>
											<p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
												You have received a new message from your website contact form.
											</p>
											
											<table role="presentation" style="width: 100%; border-collapse: collapse;">
												<tr>
													<td style="padding: 15px 0; border-bottom: 1px solid #eeeeee;">
														<p style="margin: 0; color: #ff6b35; font-size: 12px; font-weight: bold; text-transform: uppercase;">Name</p>
														<p style="margin: 5px 0 0 0; color: #000000; font-size: 16px;">${data.name}</p>
													</td>
												</tr>
												<tr>
													<td style="padding: 15px 0; border-bottom: 1px solid #eeeeee;">
														<p style="margin: 0; color: #ff6b35; font-size: 12px; font-weight: bold; text-transform: uppercase;">Email</p>
														<p style="margin: 5px 0 0 0; color: #000000; font-size: 16px;">
															<a href="mailto:${data.email}" style="color: #000000; text-decoration: none;">${data.email}</a>
														</p>
													</td>
												</tr>
												${
													data.phone
														? `
												<tr>
													<td style="padding: 15px 0; border-bottom: 1px solid #eeeeee;">
														<p style="margin: 0; color: #ff6b35; font-size: 12px; font-weight: bold; text-transform: uppercase;">Phone</p>
														<p style="margin: 5px 0 0 0; color: #000000; font-size: 16px;">
															<a href="tel:${data.phone}" style="color: #000000; text-decoration: none;">${data.phone}</a>
														</p>
													</td>
												</tr>
												`
														: ''
												}
												<tr>
													<td style="padding: 15px 0;">
														<p style="margin: 0; color: #ff6b35; font-size: 12px; font-weight: bold; text-transform: uppercase;">Message</p>
														<p style="margin: 10px 0 0 0; color: #000000; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
													</td>
												</tr>
											</table>
											
											<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
												<p style="margin: 0; color: #666666; font-size: 14px;">
													<strong style="color: #000000;">Quick Actions:</strong><br>
													Reply to: <a href="mailto:${data.email}" style="color: #ff6b35; text-decoration: none;">${data.email}</a>
													${data.phone ? `<br>Call: <a href="tel:${data.phone}" style="color: #ff6b35; text-decoration: none;">${data.phone}</a>` : ''}
												</p>
											</div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td style="padding: 20px; text-align: center; color: #999999; font-size: 12px;">
								<p style="margin: 0;">
									This email was sent from your FREMI website contact form.<br>
									<a href="https://fremi-demo.vercel.app" style="color: #ff6b35; text-decoration: none;">fremi-demo.vercel.app</a>
								</p>
							</td>
						</tr>
					</table>
				</body>
			</html>
		`,
	})

	if (error) {
		throw new Error(`Failed to send email: ${error.message}`)
	}
}
