import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Upload from '@/models/Upload';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string | null;
    
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file received' }, { status: 400 });
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const base64Data = buffer.toString('base64');
    const filename = `${type || 'upload'}_${file.name}`;
    const contentType = file.type;

    const newUpload = new Upload({
      filename,
      contentType,
      data: `data:${contentType};base64,${base64Data}`
    });

    await newUpload.save();
    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      fileId: newUpload._id,
      url: `data:${contentType};base64,${base64Data}`
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: error.message || 'Error uploading file' }, { status: 500 });
  }
}
