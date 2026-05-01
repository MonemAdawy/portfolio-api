import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined in environment");
  }

  await mongoose.connect(uri, {
    tls: true,
    tlsAllowInvalidCertificates: true,   // يسمح بالشهادات غير الصالحة (للتجربة فقط)
    // أو بدلاً من ذلك يمكنك تعيين الـ TLS version المناسب
  });
  console.log("DB connected");
}