import { Body, Container, Heading, Html, Section, Tailwind, Text, Link } from '@react-email/components';
import * as React from 'react';

interface EvictionTemplateProps {
    domain: string;
    description?: string;
}

export function EvictionTemplate({ domain, description }: EvictionTemplateProps) {

    return (
        <Tailwind>
            <Html>
                <Body className="bg-[#e4e9f2] text-black font-sans py-10">
                    <Container className="bg-white max-w-xl mx-auto border rounded shadow p-8">
                        <Heading className="text-2xl font-bold mb-6 text-center text-[#002b5b]">
                            Eviction Notice from Dormitory System
                        </Heading>
                        <Text className="mb-4 text-lg">
                            You’ve been evicted from your room.
                               {description}
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}
