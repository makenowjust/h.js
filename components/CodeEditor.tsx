import { ChangeEvent, useCallback, useMemo, useState } from "react";

import h from "../../h.js";

export default function CodeEditor({ code: defaultCode }: { code: string }) {
  const [code, setCode] = useState<string>(defaultCode);
  const html = useMemo(() => h(code) + "<br>", [code]);
  const change = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setCode(() => event.target.value);
    },
    [setCode]
  );

  return (
    <div className="overflow-hidden relative w-full h-full text-left">
      <textarea
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        data-gramm="false"
        className="block overflow-hidden absolute top-0 left-0 p-0 m-0 w-full h-full font-code antialiased font-normal leading-[1.5em] whitespace-pre-wrap break-all bg-transparent border-0 outline-none resize-none"
        style={{ WebkitTextFillColor: "transparent" }}
        onChange={change}
        value={code}
      ></textarea>
      <pre
        className="block overflow-hidden relative w-full h-full font-code font-normal leading-[1.5em] whitespace-pre-wrap break-all border-0 pointer-events-none highlight"
        dangerouslySetInnerHTML={{ __html: html }}
      ></pre>
    </div>
  );
}
