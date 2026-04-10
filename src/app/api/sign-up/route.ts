export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserByUsername = await UserModel.findOne({
      username,
    });

    if (existingUserByUsername) {
      if (existingUserByUsername.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'Username is already taken',
          },
          { status: 400 }
        );
      }
      // If username exists but is not verified, we can't let another email use it 
      // because the username index is unique in MongoDB.
      // We check if the email is different.
      if (existingUserByUsername.email !== email) {
        return Response.json(
          {
            success: false,
            message: 'Username is already taken by another unverified account',
          },
          { status: 400 }
        );
      }
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.username = username; // Update username in case it changed
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }

    console.log(`Verification code for ${username}: ${verifyCode}`);

    // Send verification email (Attempt but don't block if it fails in dev)
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      console.warn('Email sending failed, but continuing for dev purposes. Code is:', verifyCode);
      return Response.json(
        {
          success: true,
          message: 'User registered, but verification email failed to send. Please use the code from terminal.',
        },
        { status: 201 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}
