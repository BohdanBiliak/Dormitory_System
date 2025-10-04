import React from "react";
import { Container, Html, Tailwind, Body } from "@react-email/components";
import { Heading } from "@react-email/components";
import { Text } from "@react-email/components";

export const RejectTemplate = ({domain, name, reason, type }: { domain: string; name: string; reason: string; type: string }) => {
    return (
        <Tailwind>
            <Html>
                <Body className="bg-[#e4e9f2] text-black font-sans py-10">
                    <Container className="bg-white max-w-xl mx-auto border rounded shadow p-8">
                        <Heading className="text-2xl font-bold mb-6 text-center text-[#002b5b]">
                            Confirmation Request Rejected
                        </Heading>
                        <Text className="mb-4 text-lg">
                            Dear {name},
                        </Text>
                        <Text className="mb-4 text-lg">
                            We regret to inform you that your {type.toLowerCase().replace('_', ' ')} request has been rejected.
                        </Text>
                        <Text className="mb-4 text-lg">
                            Reason for rejection:
                        </Text>
                        <Text className="mb-4 p-4 bg-gray-100 border-l-4 border-red-500">
                            {reason}
                        </Text>
                        <Text className="mb-4 text-lg">
                            If you have any questions or need further assistance, please feel free to contact our support team.
                        </Text>
                        <Text className="mt-6 text-lg">
                            Best regards,
                        </Text>
                        <Text className="text-lg">
                            Dormitory Management Team
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}