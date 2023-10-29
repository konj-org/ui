import type { ComponentProps, JSX } from "preact";
import type { ChangeEventHandler } from "preact/compat";

import {
  useCallback,
  useRef,
  useState,
  useEffect,
  type StateUpdater,
} from "preact/hooks";

//----- CVA -----//
import { cva } from "class-variance-authority";

//----- TW Merge -----//
import { twMerge } from "tailwind-merge";

//----- Icons -----//

/**
 * The following icon is provided by Heroicons
 *  @see {@link https://github.com/tailwindlabs/heroicons}
 *  @license MIT
 */
const FolderOpenIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  viewBox = "0 0 24 24",
  fill = "currentColor",
  className = "w-6 h-6",
  ...props
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...props}
    >
      <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z" />
    </svg>
  );
};

/**
 * The following icon is provided by Heroicons
 *  @see {@link https://github.com/tailwindlabs/heroicons}
 *  @license MIT
 */
const PlusIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  viewBox = "0 0 24 24",
  fill = "currentColor",
  className = "w-6 h-6",
  ...props
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
        clip-rule="evenodd"
      />
    </svg>
  );
};

/**
 * The following icon is provided by Heroicons
 *  @see {@link https://github.com/tailwindlabs/heroicons}
 *  @license MIT
 */
const XMarkIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  viewBox = "0 0 24 24",
  fill = "currentColor",
  className = "w-6 h-6",
  ...props
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
};

//----- Interfaces -----//
interface FileInputProps extends ComponentProps<"input"> {
  label?: string;
  buttonChildren?: JSX.Element | JSX.Element[] | string;
  description?: JSX.Element | JSX.Element[] | string;
  dropText?: string;
  acceptedTypes: string[];
  maxSize?: number;
  noPreviewText?: string;
  onFiles?: StateUpdater<File[]>;
}

type FileInputFile = {
  file: File;
  thumbnail: string;
};

//----- Internal Utils -----//
const formatAcceptedTypes = (types: string[]) => {
  const accept: string[] = [];

  types.forEach((type) => accept.push("." + type.slice(type.indexOf("/") + 1)));

  return accept.join(",");
};

//----- Class Names -----//
const thumbnailButtons = cva(
  [
    "block",
    "flex-shrink-0",
    "aspect-square",
    "w-8",
    "overflow-hidden",
    "rounded-lg",
    "backdrop-blur-md",
    "transition-colors",
    "overflow-hidden",
    "border-transparent",
    "border",
    "dark:data-[focused=true]:border-primary-400",
    "data-[focused=true]:border-primary-600",
    "md:rounded-[calc(theme(borderRadius.2xl)_-_theme(spacing.2))]",
  ],
  {
    variants: {
      padding: {
        true: ["p-2", "border-0"],
        false: [],
      },
      color: {
        theme: [
          "bg-neutral-200",
          "dark:bg-neutral-800",
          "hover:bg-neutral-300",
          "hover:dark:bg-neutral-700",
          "active:bg-neutral-400",
          "active:dark:bg-neutral-600",
        ],
        red: [
          "bg-red-100/50",
          "dark:bg-red-900/50",
          "hover:bg-red-200/75",
          "hover:dark:bg-red-800/75",
          "active:bg-red-200",
          "active:dark:bg-red-800",
        ],
        green: [
          "bg-green-100/50",
          "dark:bg-green-900/50",
          "hover:bg-green-200/75",
          "hover:dark:bg-green-800/75",
          "active:bg-green-200",
          "active:dark:bg-green-800",
        ],
      },
    },
    defaultVariants: {
      padding: true,
      color: "theme",
    },
  }
);

const thumbnailPreviews = cva([
  "absolute",
  "top-0",
  "left-0",
  "w-full",
  "h-full",
  "object-center",
  "object-cover",
  "z-10",
  "flex",
  "flex-col",
  "justify-center",
  "items-center",
  "backdrop-blur-xl",
  "bg-neutral-200",
  "dark:bg-neutral-800",
]);

//----- Internal Components -----//
const DefaultButtonChildren = () => {
  return (
    <p
      className={[
        "not-prose",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "gap-2",
      ].join(" ")}
    >
      <span data-icon>
        <FolderOpenIcon className="w-12 h-12" />
      </span>
      <span className="text-xs opacity-75">Drag and drop, or Click</span>
    </p>
  );
};

//----- Main Component -----//
export const FileInput = ({
  label = "File input",
  buttonChildren,
  description,
  className,
  multiple,
  acceptedTypes,
  dropText = "Drop Here",
  noPreviewText = "This files doesn't have a preview",
  maxSize,
  onFiles,
  ...props
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [files, setFiles] = useState<FileInputFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(0);

  /** Manages the files passed to input element */
  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      // Looping over new files and creating thumbnails
      const newFiles: FileInputFile[] = [];
      const externalFiles: File[] = [];

      for (const file of [...(files as unknown as File[])]) {
        // Validating size
        if (typeof maxSize !== "undefined" && file.size > maxSize) return;

        // validating types
        if (!acceptedTypes.includes(file.type)) return;

        const imgUrl = URL.createObjectURL(file);
        newFiles.push({ thumbnail: imgUrl, file });
        onFiles && externalFiles.push(file);
      }

      if (!multiple) {
        // Incase the input is for single a file only we will remove the current files
        setFiles((curr) => {
          curr.forEach(({ thumbnail }) => {
            URL.revokeObjectURL(thumbnail);
          });

          return newFiles;
        });
        return;
      } else {
        // Incase the input is for multiple files, we append the new files
        setFiles((curr) => [...curr, ...newFiles]);
      }

      onFiles && onFiles(externalFiles);
    },
    [multiple, acceptedTypes, maxSize, onFiles]
  );

  /** Proxies the click event, therefore clicks the input element when the button is clicked */
  const inputClickProxy: JSX.MouseEventHandler<HTMLButtonElement> = useCallback(
    () => inputRef.current?.click(),
    []
  );

  /** Clears the input elements */
  const clear = useCallback(() => {
    if (inputRef.current === null) return;
    inputRef.current.value = "";
    inputRef.current.files = null;
    setSelectedFile(0);

    setFiles((curr) => {
      curr.forEach(({ thumbnail }) => {
        URL.revokeObjectURL(thumbnail);
      });
      return [];
    });

    onFiles && onFiles([]);
  }, [onFiles]);

  /** Manages the files passed to input element */
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { files } = e.target as HTMLInputElement;

      if (files === null || files.length === 0) return;

      handleFiles(files);
    },
    [handleFiles]
  );

  /** Handles Drop event and append file to files */
  const onDrop: JSX.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);

      if (!e.dataTransfer?.items) return;

      // @ts-ignore
      const files = [...e.dataTransfer.items]
        .filter((item) => item.kind === "file")
        .map((item) => item.getAsFile());

      handleFiles(files as File[]);
    },
    [handleFiles]
  );

  /** Manges the on drag leave event */
  const onDragLeave = useCallback((e: DragEvent) => {
    const { clientX, clientY } = e;

    if (clientX !== 0 || clientY !== 0) return;

    setDragging(false);
  }, []);

  // Appending event listeners for when user is dragging files
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("dragover", setDragging.bind(null, true));
    window.addEventListener("dragend", setDragging.bind(null, false));
    window.addEventListener("dragleave", onDragLeave);

    return () => {
      window.removeEventListener("dragover", setDragging.bind(null, true));
      window.removeEventListener("dragend", setDragging.bind(null, false));
      window.removeEventListener("dragleave", onDragLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-droppable={false}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={onDrop}
      className={twMerge(
        [
          "grid",
          "gap-2",
          "p-2",
          "border",
          "bg-neutral-100",
          "dark:bg-neutral-900",
          "border-neutral-200",
          "dark:border-neutral-800",
          "rounded-2xl",
          "not-prose",
          "@container",
          "data-[droppable=true]:opacity-25",
          "relative",
        ].join(" "),
        className as string
      )}
    >
      {
        // Overlay for when there is a file being dragged
        dragging && (
          <div
            className={[
              "absolute",
              "inset-0",
              "z-50",
              "bg-neutral-100/50",
              "dark:bg-neutral-900/50",
              "backdrop-blur-md",
              "flex",
              "justify-center",
              "items-center",
            ].join(" ")}
          >
            {dropText}
          </div>
        )
      }
      <div
        className={[
          "aspect-[4/2]",
          "@xl:aspect-[7/3]",
          "rounded-[calc(theme(borderRadius.2xl)_-_theme(spacing.2))]",
          "relative",
          "overflow-hidden",
          "flex",
          "bg-neutral-200",
          "dark:bg-neutral-800",
          "hover:bg-neutral-300",
          "hover:dark:bg-neutral-700",
          "active:bg-neutral-400",
          "active:dark:bg-neutral-600",
          "border-neutral-300",
          "dark:border-neutral-700",
          "border",
          "transition-colors",
        ].join(" ")}
      >
        {
          // Displaying the thumbnail incase the input includes some item
          files.length !== 0 &&
            (files[selectedFile]!.file.type.includes("video") ? (
              <video
                controls
                src={files[selectedFile]!.thumbnail}
                className={thumbnailPreviews()}
              />
            ) : files[selectedFile]!.file.type.includes("image") ? (
              <img
                src={files[selectedFile]!.thumbnail}
                alt={files[selectedFile]!.file.name}
                className={thumbnailPreviews()}
              />
            ) : (
              <div className={thumbnailPreviews()}>
                <p className="text-lg mb-2">{files[selectedFile]!.file.name}</p>
                <p className="text-xs opacity-75">{noPreviewText}</p>
              </div>
            ))
        }
        <input
          multiple={multiple}
          accept={formatAcceptedTypes(acceptedTypes)}
          ref={inputRef}
          onChange={onChange}
          type="file"
          className="absolute left-[50%] top-[50%] -z-10 translate-x-[-50%] translate-y-[-50%] opacity-0 w-1 h-1"
          {...props}
        />

        <button
          type="button"
          onClick={inputClickProxy}
          data-input-proxy="true"
          className={["grow", "p-6", "[&_*]:pointer-events-none"].join(" ")}
        >
          {buttonChildren ? buttonChildren : <DefaultButtonChildren />}
        </button>
      </div>
      <div className="p-2 grid gap-2 overflow-hidden">
        <div className="grid gap-2 grid-cols-[30%_65%] items-start content-start">
          {/* Main label of the input element */}
          <div className="flex flex-col">
            <label>{label}</label>
            <span className="text-sm opacity-75 text-red-600 dark:text-red-400">
              {formatAcceptedTypes(acceptedTypes).replaceAll(",", ", ")}
            </span>
          </div>
          {
            // Item controls for multi file inputs
            files.length !== 0 && (
              <div
                className={[
                  "ml-auto",
                  "flex",
                  "gap-2",
                  "max-w-full",
                  "overflow-x-scroll",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={clear}
                  className={thumbnailButtons({ color: "red" })}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
                {
                  // Only Displaying thumbnails incase input accepts more than one item
                  multiple &&
                    files.map(({ thumbnail, file }, index) => (
                      <button
                        type="button"
                        data-focused={selectedFile === index}
                        className={thumbnailButtons({ padding: false })}
                        key={thumbnail}
                        onClick={setSelectedFile.bind(null, index)}
                      >
                        {file.type.includes("image") ? (
                          <img
                            className="object-cover object-center w-8 h-8"
                            src={thumbnail}
                            alt={file.name}
                          />
                        ) : (
                          index + 1
                        )}
                      </button>
                    ))
                }
                {
                  // Only showing append button incase input is in multiple mode
                  multiple && (
                    <button
                      type="button"
                      data-input-proxy="true"
                      onClick={inputClickProxy}
                      className={thumbnailButtons({ color: "green" })}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  )
                }
              </div>
            )
          }
        </div>
        {
          // Only displaying description while it exits
          description && <p className="text-sm opacity-75">{description}</p>
        }
      </div>
    </div>
  );
};
