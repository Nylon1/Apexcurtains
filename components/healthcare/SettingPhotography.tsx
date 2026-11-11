import Image from "next/image";
import {
  settingPhotographs,
  type SettingPhotoKey,
  type SettingPhotograph,
} from "@/lib/healthcare/settings-photography";

export function SettingImage({
  photo,
  priority = false,
  sizes = "(max-width: 800px) 100vw, 50vw",
}: {
  photo: SettingPhotoKey;
  priority?: boolean;
  sizes?: string;
}) {
  const item: SettingPhotograph = settingPhotographs[photo];
  return (
    <div className="hc-setting-image">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: item.position || "center" }}
      />
    </div>
  );
}

export function PhotoCredit({ photo }: { photo: SettingPhotoKey }) {
  const item: SettingPhotograph = settingPhotographs[photo];
  return (
    <span className="hc-photo-credit">
      Photo: <a href={item.source} target="_blank" rel="noopener noreferrer">{item.credit}</a>
      {item.licenceLabel && (
        <> · <a href={item.rightsEvidence} target="_blank" rel="noopener noreferrer">{item.licenceLabel}</a>{item.adaptation && ` · ${item.adaptation}`}</>
      )}
    </span>
  );
}

export default function SettingPhotography({
  photo,
  priority = false,
  className = "",
}: {
  photo: SettingPhotoKey;
  priority?: boolean;
  className?: string;
}) {
  const item = settingPhotographs[photo];
  return (
    <figure className={`hc-setting-photo ${className}`}>
      <SettingImage photo={photo} priority={priority} />
      <figcaption>
        <span className="hc-photo-title">{item.title}</span>
        <PhotoCredit photo={photo} />
        <span className="hc-photo-context">{item.context}</span>
      </figcaption>
    </figure>
  );
}
