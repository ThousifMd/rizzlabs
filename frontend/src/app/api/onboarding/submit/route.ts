import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image to Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'rizzlab-onboarding',
                resource_type: 'auto',
                transformation: [
                    { width: 800, height: 800, crop: 'limit' }, // Resize large images
                    { quality: 'auto:good' } // Optimize quality
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result!.secure_url);
                }
            }
        );

        uploadStream.end(buffer);
    });
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Extract text fields
        const name = formData.get('name') as string;
        const age = formData.get('age') as string;
        const datingGoal = formData.get('datingGoal') as string;
        const currentMatches = formData.get('currentMatches') as string;
        const bodyType = formData.get('bodyType') as string;
        const stylePreference = formData.get('stylePreference') as string;
        const ethnicity = formData.get('ethnicity') as string;
        const interests = JSON.parse(formData.get('interests') as string);
        const currentBio = formData.get('currentBio') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const weeklyTips = formData.get('weeklyTips') === 'true';

        // Handle original photos
        const originalPhotos = formData.getAll('originalPhotos') as File[];
        const originalPhotoUrls: string[] = [];

        // Handle screenshot photos
        const screenshotPhotos = formData.getAll('screenshotPhotos') as File[];
        const screenshotPhotoUrls: string[] = [];

        // Upload original photos to Cloudinary
        console.log(`Uploading ${originalPhotos.length} original photos...`);
        for (const photo of originalPhotos) {
            if (photo instanceof File) {
                try {
                    const cloudinaryUrl = await uploadToCloudinary(photo);
                    originalPhotoUrls.push(cloudinaryUrl);
                    console.log(`Uploaded original photo: ${cloudinaryUrl}`);
                } catch (error) {
                    console.error('Error uploading original photo:', error);
                    throw new Error(`Failed to upload original photo: ${photo.name}`);
                }
            }
        }

        // Upload screenshot photos to Cloudinary
        console.log(`Uploading ${screenshotPhotos.length} screenshot photos...`);
        for (const screenshot of screenshotPhotos) {
            if (screenshot instanceof File) {
                try {
                    const cloudinaryUrl = await uploadToCloudinary(screenshot);
                    screenshotPhotoUrls.push(cloudinaryUrl);
                    console.log(`Uploaded screenshot: ${cloudinaryUrl}`);
                } catch (error) {
                    console.error('Error uploading screenshot:', error);
                    throw new Error(`Failed to upload screenshot: ${screenshot.name}`);
                }
            }
        }

        // Prepare data for backend
        const submissionData = {
            name,
            age,
            datingGoal,
            currentMatches,
            bodyType,
            stylePreference,
            ethnicity,
            interests,
            currentBio,
            email,
            phone,
            weeklyTips,
            originalPhotos: originalPhotoUrls,
            screenshotPhotos: screenshotPhotoUrls
        };

        // Send to backend API
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
        console.log('Sending data to backend:', backendUrl);

        const response = await fetch(`${backendUrl}/api/onboarding/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend API error:', response.status, errorText);
            throw new Error(`Backend API error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Backend response:', result);

        return NextResponse.json({
            success: true,
            submissionId: result.submissionId,
            message: 'Onboarding submitted successfully',
            photoCount: {
                original: originalPhotoUrls.length,
                screenshots: screenshotPhotoUrls.length
            },
            cloudinaryUrls: {
                original: originalPhotoUrls,
                screenshots: screenshotPhotoUrls
            }
        });

    } catch (error) {
        console.error('Error processing onboarding submission:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to process submission',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
