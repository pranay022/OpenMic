import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>OpenMic Verification Code</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjpYvicL-0A.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your OpenMic verification code is {otp}</Preview>
      <Section style={{ backgroundColor: '#09090b', padding: '40px', borderRadius: '24px', color: '#ffffff', fontFamily: 'Inter, Helvetica, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
        <Row style={{ marginBottom: '24px' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#ffffff' }}>OpenMic</Text>
        </Row>
        <Row>
          <Heading as="h2" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#ffffff' }}>Hello {username},</Heading>
        </Row>
        <Row>
          <Text style={{ fontSize: '16px', color: '#a1a1aa', lineHeight: '1.5', marginBottom: '24px' }}>
            Welcome to OpenMic To finalize your account and start gathering honest feedback, please enter the following verification code:
          </Text>
        </Row>
        <Row>
          <Text style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '16px', textAlign: 'center' as const, border: '1px solid #27272a', fontSize: '32px', fontWeight: 'bold', letterSpacing: '8px', color: '#10b981', margin: '0' }}>
            {otp}
          </Text>
        </Row>
        <Row>
          <Text style={{ fontSize: '14px', color: '#52525b', marginTop: '24px', lineHeight: '1.5' }}>
            If you did not request this verification, {username}, you can safely ignore this email. This code is unique to your account.
          </Text>
        </Row>
        <Row style={{ marginTop: '40px', borderTop: '1px solid #27272a', paddingTop: '24px' }}>
          <Text style={{ fontSize: '12px', color: '#3f3f46', margin: '0' }}>
            &copy; {new Date().getFullYear()} OpenMic • All rights reserved.
          </Text>
          <Text style={{ fontSize: '1px', color: '#09090b', opacity: 0, margin: '0', display: 'none' }}>
            Ref: {otp}-{Date.now()}
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
