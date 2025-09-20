// src/components/BackgroundShapes.js
export default function BackgroundShapes() {
  return (
    <div className="bg-shapes">
      {[...Array(6)].map((_, index) => (
        <div className="shape" key={index}></div>
      ))}
    </div>
  );
}
