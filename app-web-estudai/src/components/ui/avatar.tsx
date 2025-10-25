import React from "react";

interface AvatarProps {
  src?: string; // URL da imagem (opcional)
  alt?: string; // texto alternativo
  fallback?: string; // texto se não houver imagem
  className?: string;
}

export function Avatar({ src, alt, fallback, className = "" }: AvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-gray-700">
          {fallback?.substring(0, 2).toUpperCase() || "U"}
        </span>
      )}
    </div>
  );
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-semibold text-gray-700">{children}</span>
  );
}
