"use client";

import { useEffect, useRef, useState } from "react";
import InteractivePhoto from "@/components/family/InteractivePhoto";
import {
  sampleFamilyPhoto,
  sampleFamilyTags,
  type PhotoTag,
} from "@/data/familyPhoto";
import { kinshipTerms, kinshipLabel } from "@/data/kinship";

const STORE_KEY = "kammanest_family_photo";

type Pending = { x: number; y: number } | null;

export default function FamilyPhotoPage() {
  const [src, setSrc] = useState<string>(sampleFamilyPhoto);
  const [tags, setTags] = useState<PhotoTag[]>(sampleFamilyTags);
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState<Pending>(null);
  const [loaded, setLoaded] = useState(false);

  // Form fields for a new tag.
  const [fName, setFName] = useState("");
  const [fKin, setFKin] = useState(""); // index into kinshipTerms
  const [fCustom, setFCustom] = useState("");
  const [fIntro, setFIntro] = useState("");
  const [fAudio, setFAudio] = useState(""); // voice note as a data URL
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Load any saved photo + tags on mount (per-browser, like the rest of the app).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.src) setSrc(parsed.src);
        if (Array.isArray(parsed.tags)) setTags(parsed.tags);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  // Persist whenever the photo or tags change (after the initial load).
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ src, tags }));
    } catch {
      /* storage full / blocked — ignore */
    }
  }, [src, tags, loaded]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result as string); // data URL persists in localStorage
      setTags([]);
      setEditing(true);
    };
    reader.readAsDataURL(file);
  }

  function resetForm() {
    setPending(null);
    setFName("");
    setFKin("");
    setFCustom("");
    setFIntro("");
    setFAudio("");
    setRecording(false);
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mr.mimeType || "audio/webm",
        });
        const reader = new FileReader();
        reader.onload = () => setFAudio(reader.result as string);
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      recorderRef.current = mr;
      setRecording(true);
    } catch {
      alert("Couldn't access the microphone. Check browser permissions.");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  function uploadAudio(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFAudio(reader.result as string);
    reader.readAsDataURL(file);
  }

  function saveTag() {
    if (!pending || !fName.trim()) return;
    const rel =
      fCustom.trim() ||
      (fKin !== "" ? kinshipLabel(kinshipTerms[Number(fKin)]) : "");
    setTags((t) => [
      ...t,
      {
        x: pending.x,
        y: pending.y,
        name: fName.trim(),
        rel,
        intro: fIntro.trim(),
        audio: fAudio || undefined,
      },
    ]);
    resetForm();
  }

  function loadSample() {
    setSrc(sampleFamilyPhoto);
    setTags(sampleFamilyTags);
    setEditing(false);
    resetForm();
  }

  function clearTags() {
    setTags([]);
    resetForm();
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Interactive Family Photo
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Tag the people in a family or wedding photo, then hover or tap each
          person to reveal who they are — in Tamil kinship words with an English
          meaning. A living way to teach the next generation &ldquo;who&apos;s
          who&rdquo;.
        </p>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setEditing((v) => !v);
            resetForm();
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition ${
            editing
              ? "bg-kulam text-white"
              : "bg-kulam-gold text-kulam-dark hover:brightness-105"
          }`}
        >
          {editing ? "✏️ Tag mode: ON — click a face" : "✏️ Tag mode: OFF"}
        </button>

        <label className="cursor-pointer rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-kulam-dark shadow-sm transition hover:bg-stone-50">
          📷 Upload photo
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        <button
          type="button"
          onClick={loadSample}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-kulam-dark shadow-sm transition hover:bg-stone-50"
        >
          Load sample family
        </button>

        {tags.length > 0 && (
          <button
            type="button"
            onClick={clearTags}
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
          >
            Clear tags
          </button>
        )}
      </div>

      {editing && !pending && (
        <p className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          Tag mode is on — click on each person&apos;s face in the photo to add
          them.
        </p>
      )}

      {src === sampleFamilyPhoto && (
        <p className="-mt-2 text-xs italic text-stone-400">
          🖼️ This sample photo is AI-generated for illustration. Upload your own
          family photo above to make it real.
        </p>
      )}

      <InteractivePhoto
        src={src}
        tags={tags}
        editable={editing}
        onAddSpot={(x, y) => {
          setPending({ x, y });
          setFName("");
          setFKin("");
          setFCustom("");
          setFIntro("");
          setFAudio("");
          setRecording(false);
        }}
      />

      {/* New-tag form */}
      {pending && (
        <div className="rounded-2xl border border-kulam-gold/40 bg-white p-5 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-kulam-dark">
            Add this person
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-stone-600">Name</span>
              <input
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                placeholder="e.g. Suresh"
                className="w-full rounded-lg border border-stone-300 px-3 py-2"
                autoFocus
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-stone-600">
                Relationship
              </span>
              <select
                value={fKin}
                onChange={(e) => setFKin(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
              >
                <option value="">Choose a kinship term…</option>
                {kinshipTerms.map((k, i) => (
                  <option key={k.term} value={i}>
                    {k.term} ({k.tamil}) · {k.english}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-stone-600">
                Or type a custom relationship (optional)
              </span>
              <input
                value={fCustom}
                onChange={(e) => setFCustom(e.target.value)}
                placeholder="e.g. Athimber (அத்திம்பேர்) · atthai's husband"
                className="w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-stone-600">
                Short intro
              </span>
              <textarea
                value={fIntro}
                onChange={(e) => setFIntro(e.target.value)}
                rows={2}
                placeholder="1–2 lines — what they do, a memory, anything."
                className="w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>

            <div className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-stone-600">
                Voice note (optional) — record a real voice or a blessing
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {!recording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="rounded-lg bg-red-50 px-3 py-1.5 font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    🎙️ Record
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="animate-pulse rounded-lg bg-red-600 px-3 py-1.5 font-semibold text-white"
                  >
                    ⏹️ Stop recording
                  </button>
                )}
                <label className="cursor-pointer rounded-lg border border-stone-300 bg-white px-3 py-1.5 font-semibold text-kulam-dark transition hover:bg-stone-50">
                  ⬆️ Upload audio
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={uploadAudio}
                    className="hidden"
                  />
                </label>
                {fAudio && (
                  <>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <audio controls src={fAudio} className="h-9" />
                    <button
                      type="button"
                      onClick={() => setFAudio("")}
                      className="text-xs font-semibold text-stone-500 underline"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={saveTag}
              disabled={!fName.trim()}
              className="rounded-lg bg-kulam px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-40"
            >
              Save person
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-stone-300 bg-white px-5 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Kinship reference */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-kulam-dark">
          Tamil kinship words
        </h3>
        <p className="mt-1 text-sm text-stone-500">
          The names we use for our relatives — keep them alive.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {kinshipTerms.map((k) => (
            <div
              key={k.term}
              className="flex items-baseline gap-2 border-b border-stone-100 pb-1 text-sm"
            >
              <span className="font-semibold text-kulam">{k.term}</span>
              <span className="text-kulam-dark">{k.tamil}</span>
              <span className="text-stone-500">· {k.english}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs italic text-stone-400">
        Photos &amp; tags are saved in this browser only. A shared, sign-in
        version (Supabase Storage) is coming next so the whole family can view
        and add to the same photo.
      </p>
    </div>
  );
}
