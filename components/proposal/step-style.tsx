'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ImagePlus, Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChoiceCard, Field, FieldError, FieldGroup, inputClass } from '@/components/proposal/fields'
import type { StepProps } from '@/components/proposal/types'
import { referenceUpload, styles } from '@/content/form'
import { cn } from '@/lib/utils'

function StyleSwatch({ palette }: { palette: (typeof styles)[number]['palette'] }) {
  if (!palette) {
    return (
      <span
        aria-hidden
        className="flex h-16 items-center justify-center rounded-xl border border-dashed border-ink/20 bg-sand font-serif text-lg italic text-teal"
      >
        do zero
      </span>
    )
  }
  return (
    <span aria-hidden className="relative flex h-16 overflow-hidden rounded-xl" style={{ background: palette.envelope }}>
      <span className="m-2 flex flex-1 flex-col justify-center gap-1.5 rounded-md px-3" style={{ background: palette.paper }}>
        <span className="h-1.5 w-2/3 rounded-full" style={{ background: palette.ink }} />
        <span className="h-1 w-1/2 rounded-full" style={{ background: palette.muted, opacity: 0.6 }} />
      </span>
      <span
        className="absolute right-3 bottom-2 size-5 rounded-full ring-2"
        style={{ background: palette.seal, ['--tw-ring-color' as string]: palette.paper }}
      />
    </span>
  )
}

export function StepStyle({
  values,
  set,
  register,
  errors,
  files,
  onFilesChange,
}: StepProps & { files: File[]; onFilesChange: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [fileError, setFileError] = useState<string>()

  const previews = useMemo(() => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })), [files])
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews])

  function addFiles(list: FileList | null) {
    if (!list) return
    const incoming = Array.from(list)
    const invalid = incoming.find((f) => !referenceUpload.types.includes(f.type) || f.size > referenceUpload.maxBytes)
    if (invalid) {
      setFileError('Use imagens JPG, PNG ou WebP com até 5 MB cada.')
      return
    }
    const next = [...files, ...incoming].slice(0, referenceUpload.maxFiles)
    setFileError(files.length + incoming.length > referenceUpload.maxFiles ? 'Você pode enviar até 3 imagens.' : undefined)
    onFilesChange(next)
  }

  function updateColor(index: number, color: string) {
    const next = [...values.colors]
    next[index] = color
    set('colors', next)
  }

  return (
    <div className="flex flex-col gap-9">
      <FieldGroup id="field-style" legend="Qual estilo combina mais com você?" error={errors.style}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {styles.map((style) => (
            <ChoiceCard
              key={style.id}
              name="style"
              value={style.id}
              checked={values.style === style.id}
              onSelect={(v) => set('style', v)}
              title={style.label}
              description={style.description}
              visual={<StyleSwatch palette={style.palette} />}
              className={style.id === 'exclusivo' ? 'sm:col-span-2' : undefined}
            />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup
        id="field-colors"
        legend="Cores preferidas"
        optional
        hint="Escolha até 3 cores. A primeira aparece na prévia ao lado."
      >
        <div className="flex flex-wrap items-center gap-3">
          {values.colors.map((color, i) => (
            <div key={i} className="relative">
              <label className="block size-12 cursor-pointer overflow-hidden rounded-full ring-1 ring-ink/10 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-teal/40">
                <span className="sr-only">Cor {i + 1}</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="size-16 -translate-x-2 -translate-y-2 cursor-pointer border-0 p-0"
                />
              </label>
              <button
                type="button"
                onClick={() => set('colors', values.colors.filter((_, j) => j !== i))}
                className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-ink text-ivory focus-visible:outline-2 focus-visible:outline-teal"
                aria-label={`Remover cor ${i + 1}`}
              >
                <X className="size-3" strokeWidth={2} />
              </button>
            </div>
          ))}
          {values.colors.length < 3 && (
            <button
              type="button"
              onClick={() => set('colors', [...values.colors, values.colors.length === 0 ? '#0F766E' : '#E4DED4'])}
              className="flex size-12 items-center justify-center rounded-full border border-dashed border-ink/25 text-graphite transition-colors hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-teal"
              aria-label="Adicionar cor"
            >
              <Plus className="size-4" strokeWidth={1.5} />
            </button>
          )}
        </div>
        <Input
          aria-label="Descreva as cores, se preferir"
          {...register('colorsText')}
          placeholder="Ou descreva: verde-oliva, off-white, toques de terracota…"
          className={inputClass}
        />
      </FieldGroup>

      <div className="flex flex-col gap-3">
        <p id="upload-label" className="flex items-baseline gap-2 text-sm font-medium text-ink">
          Referências visuais <span className="text-xs font-normal text-graphite">opcional</span>
        </p>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            addFiles(e.dataTransfer.files)
          }}
          className={cn(
            'flex flex-col items-center gap-3 rounded-2xl border border-dashed p-6 text-center transition-colors',
            dragging ? 'border-teal bg-teal/5' : 'border-ink/20 bg-ivory',
          )}
        >
          <ImagePlus className="size-6 text-teal" strokeWidth={1.5} aria-hidden />
          <p className="text-sm leading-relaxed text-graphite">
            Arraste até 3 imagens aqui ou{' '}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={files.length >= referenceUpload.maxFiles}
              className="font-medium text-ink underline decoration-teal underline-offset-4 disabled:opacity-50"
            >
              escolha do seu dispositivo
            </button>
            . JPG, PNG ou WebP, até 5 MB.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={referenceUpload.types.join(',')}
            multiple
            aria-labelledby="upload-label"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              addFiles(e.target.files)
              e.target.value = ''
            }}
          />
          {previews.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-3">
              {previews.map(({ file, url }, i) => (
                <li key={`${file.name}-${i}`} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Referência: ${file.name}`} className="size-20 rounded-xl object-cover ring-1 ring-ink/10" />
                  <button
                    type="button"
                    onClick={() => onFilesChange(files.filter((_, j) => j !== i))}
                    className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-ink text-ivory focus-visible:outline-2 focus-visible:outline-teal"
                    aria-label={`Remover ${file.name}`}
                  >
                    <X className="size-3.5" strokeWidth={2} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <FieldError id="upload-error" message={fileError} />
      </div>

      <Field id="references" label="Links de referência ou descrição" optional>
        <Textarea
          id="references"
          {...register('references')}
          rows={3}
          placeholder="Cole links do Pinterest ou Instagram, ou descreva o clima que você imagina."
          className="min-h-24 rounded-xl border-line bg-ivory px-4 py-3 text-base text-ink placeholder:text-graphite/60 focus-visible:border-teal focus-visible:ring-teal/20 md:text-base"
        />
      </Field>

      <Field id="music" label="Música desejada" optional error={errors.music}>
        <Input id="music" {...register('music')} placeholder="Ex.: Perfect, Ed Sheeran" className={inputClass} />
      </Field>
    </div>
  )
}
