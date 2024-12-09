import { useState, useCallback } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type ProfilePictureUploadProps = {
  onUpload: (file: string) => void;
  isCircle: boolean;
  onShapeChange: (isCircle: boolean) => void;
};

export default function ProfilePictureUpload({
  onUpload,
  isCircle,
  onShapeChange,
}: ProfilePictureUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === "string") {
            setPreviewUrl(result);
            onUpload(result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [onUpload]
  );

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="profile-picture">Upload Profile Picture</Label>
        <Input
          type="file"
          id="profile-picture"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {previewUrl && (
        <div className="flex items-center space-x-2">
          <Image
            src={previewUrl}
            alt="Profile preview"
            width={16}
            height={16}
            className={`w-16 h-16 object-cover ${
              isCircle ? "rounded-full" : "rounded"
            }`}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="picture-shape"
              checked={isCircle}
              onCheckedChange={onShapeChange}
            />
            <Label htmlFor="picture-shape">Circular</Label>
          </div>
        </div>
      )}
    </div>
  );
}
