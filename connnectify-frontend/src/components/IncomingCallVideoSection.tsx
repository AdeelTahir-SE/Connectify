import * as motion from "motion/react-client"
export default function IncomingCallPersonVideoSection({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Remote video full screen */}
        <video
          id="remoteVideo"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          autoPlay
          playsInline
        />

        <motion.video
          id="localVideo"
          className="absolute bottom-6 right-6 w-48 h-48 object-cover rounded-md border-2 shadow-lg"
          autoPlay
          drag
          playsInline
        />

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
            onClick={onClose}
          >
            ✕ End Call
          </button>
        </div>
      </div>
    </section>
  );
}
