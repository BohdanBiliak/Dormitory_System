import { Body, Container, Heading, Html, Section, Tailwind, Text, Link } from '@react-email/components';
import * as React from 'react';

interface ResetPasswordTemplateProps {
	domain: string;
	token: string;
}

export function ResetPasswordTemplate({ domain, token }: ResetPasswordTemplateProps) {
	const resetLink = `${domain}/auth/new-password?token=${token}`;

	return (
		<Tailwind>
			<Html>
				<Body className="bg-[#e4e9f2] text-black font-sans py-10">
					<Container className="bg-white max-w-xl mx-auto border rounded shadow p-8">
						<Heading className="text-2xl font-bold mb-6 text-center text-[#002b5b]">
							Dormitory System — Reset Password
						</Heading>
						<Text className="mb-4 text-lg">
							You’ve requested a password reset. Click the button below to create a new password:
						</Text>
						<Section className="text-center my-6">
							<Link
								href={resetLink}
								className="bg-[#002b5b] text-white py-2 px-6 rounded inline-block text-lg no-underline"
							>
								Reset Password
							</Link>
						</Section>
						<Text className="text-sm text-gray-600">
							This link is valid for 1 hour. If you did not request this reset, please ignore the email.
						</Text>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}
