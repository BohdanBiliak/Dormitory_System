import { Body, Container, Heading, Html, Section, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface TwoFactorAuthTemplateProps {
	token: string;
}

export function TwoFactorAuthTemplate({ token }: TwoFactorAuthTemplateProps) {
	return (
		<Tailwind>
			<Html>
				<Body className="bg-[#e4e9f2] text-black font-sans py-10">
					<Container className="bg-white max-w-xl mx-auto border rounded shadow p-8">
						<Heading className="text-2xl font-bold mb-6 text-center text-[#002b5b]">
							Dormitory System — Two-Factor Authentication
						</Heading>
						<Text className="mb-4 text-lg">
							Your two-factor authentication code:
						</Text>
						<Section className="text-center my-6">
							<Text className="text-3xl font-bold text-[#002b5b]">{token}</Text>
						</Section>
						<Text className="text-sm text-gray-600">
							Enter this code in the app to complete your login. If you didn’t request this, you can safely ignore the email.
						</Text>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}
