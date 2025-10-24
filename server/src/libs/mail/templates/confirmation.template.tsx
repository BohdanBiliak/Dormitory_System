import { Body, Container, Heading, Html, Section, Tailwind, Text, Link } from "@react-email/components";
import * as React from 'react';

interface ConfirmationTemplateProps {
	domain: string;
	token: string;
}

export function ConfirmationTemplate({ domain, token }: ConfirmationTemplateProps) {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`;

	return (
		<Tailwind>
			<Html>
				<Body className="bg-[#e4e9f2] text-black font-sans py-10">
					<Container className="bg-white max-w-xl mx-auto border rounded shadow p-8">
						<Heading className="text-2xl font-bold mb-6 text-center text-[#002b5b]">
							Dormitory System — Email Confirmation
						</Heading>
						<Text className="mb-4 text-lg">
							Hello! To confirm your email address, please click the button below:
						</Text>
						<Section className="text-center my-6">
							<Link
								href={confirmLink}
								className="bg-[#002b5b] text-white py-2 px-6 rounded inline-block text-lg no-underline"
							>
								Confirm Email
							</Link>
						</Section>
						<Text className="text-sm text-gray-600">
							This link is valid for 1 hour. If you did not request this confirmation, you can ignore this message.
						</Text>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}
