import { useState, useRef } from "react";
import { Camera, X, ArrowRight, ArrowLeft, Upload } from "lucide-react";

interface UploadPersonalizeProps {
  onBack: () => void;
  onNext: () => void;
}

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

export function UploadPersonalize({ onBack, onNext }: UploadPersonalizeProps) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    dedication: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newPhotos: UploadedPhoto[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        newPhotos.push({
          id: Math.random().toString(36),
          url,
          name: file.name,
        });
      }
    });

    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 2)); // Max 2 photos
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const canProceed = photos.length > 0 && formData.childName && formData.age;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Soft Pastel Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f3] via-[#f9e6df] to-[#fde4d9]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(91,75,68,0.03)_100%)]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <header className="pt-8 md:pt-10 text-center">
          <div
            className="text-2xl md:text-3xl tracking-wide text-[#5b4b44]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            KAHANI
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-8 md:py-12">
          <div className="w-full max-w-4xl">
            {/* Main Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 md:p-12 lg:p-14 shadow-[0_20px_80px_rgba(91,75,68,0.12)] border border-white/80">
              {/* Heading */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-center mb-4 text-[#5b4b44]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Upload & Personalize
              </h2>

              {/* Subheading */}
              <p
                className="text-base md:text-lg text-center text-[#8b7b74] mb-8 md:mb-10 max-w-2xl mx-auto"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                Add your child's photo and details to make the story uniquely theirs.
              </p>

              {/* Upload Area */}
              <div className="mb-8">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`
                    relative cursor-pointer rounded-[24px] border-3 border-dashed p-8 md:p-12 transition-all duration-300
                    ${
                      isDragging
                        ? "border-[#f9c5d5] bg-[#f9c5d5]/10 scale-[1.02]"
                        : "border-[#e5d4e8] bg-[#fdf6f3]/50 hover:border-[#d9c5e0] hover:bg-[#fdf6f3]"
                    }
                  `}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Icon */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#f9e6df] to-[#fde4d9] flex items-center justify-center border-2 border-white/60 shadow-lg">
                      <Camera
                        className="w-8 h-8 md:w-10 md:h-10 text-[#c9a89c]"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <p
                        className="text-lg md:text-xl text-[#5b4b44] mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Upload 1–2 photos
                      </p>
                      <p
                        className="text-sm md:text-base text-[#8b7b74]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        .jpg or .png • Drag and drop or click to browse
                      </p>
                    </div>

                    {/* Upload Icon */}
                    <Upload
                      className="w-5 h-5 text-[#c9a89c]"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>

              {/* Photo Thumbnails */}
              {photos.length > 0 && (
                <div className="mb-8">
                  <p
                    className="text-sm md:text-base text-[#8b7b74] mb-4"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Uploaded Photos ({photos.length}/2)
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative group w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-[#e5d4e8] shadow-md"
                      >
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:bg-white hover:scale-110"
                        >
                          <X className="w-4 h-4 text-[#5b4b44]" strokeWidth={2.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Child's Name */}
                <div>
                  <label
                    htmlFor="childName"
                    className="block text-sm md:text-base text-[#5b4b44] mb-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Child's Name
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder="Enter your child's name"
                    className="w-full px-5 py-4 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                    }}
                  />
                </div>

                {/* Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm md:text-base text-[#5b4b44] mb-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter age"
                    min="1"
                    max="12"
                    className="w-full px-5 py-4 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                    }}
                  />
                </div>

                {/* Message or Dedication */}
                <div>
                  <label
                    htmlFor="dedication"
                    className="block text-sm md:text-base text-[#5b4b44] mb-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Message or Dedication <span className="text-[#c9b5af]">(Optional)</span>
                  </label>
                  <textarea
                    id="dedication"
                    name="dedication"
                    value={formData.dedication}
                    onChange={handleInputChange}
                    placeholder="Add a special message for your child..."
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none resize-none"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                    }}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
                {/* Back Button */}
                <button
                  onClick={onBack}
                  className="group px-8 py-4 rounded-full border-2 border-[#e5d4e8] bg-white/50 hover:bg-white hover:border-[#d9c5e0] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeft
                      className="w-5 h-5 text-[#8b7b74] transition-transform duration-300 group-hover:-translate-x-1"
                      strokeWidth={2.5}
                    />
                    <span
                      className="text-base md:text-lg text-[#5b4b44]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Back
                    </span>
                  </div>
                </button>

                {/* Next Button */}
                <button
                  onClick={onNext}
                  disabled={!canProceed}
                  className={`
                    group relative px-10 py-4 rounded-full overflow-hidden transition-all duration-300 shadow-lg
                    ${
                      canProceed
                        ? "hover:scale-105 active:scale-95 hover:shadow-[0_12px_48px_rgba(249,197,213,0.6)] cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }
                  `}
                >
                  {/* Mint Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                  
                  {/* Soft glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>

                  <div className="relative flex items-center gap-3">
                    <span
                      className="text-base md:text-lg text-[#5b4b44]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Next
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 text-[#5b4b44] ${
                        canProceed ? "transition-transform duration-300 group-hover:translate-x-1" : ""
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
