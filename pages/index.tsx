import type { NextPage } from "next";
import Head from "next/head";
import { promises as fs } from "fs";
import { join } from "path";

import CodeEditor from "../components/CodeEditor";
import pkg from "h.js/package.json";

export async function getStaticProps() {
  const code = (
    await fs.readFile(join(process.cwd(), "h.js"), "utf-8")
  ).trimEnd();
  return {
    props: { code },
  };
}

type Props = {
  code: string;
};

const Home: NextPage<Props> = ({ code }) => {
  const title = `${pkg.name} - ${pkg.description}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen bg-stone-700 hero">
        <div className="md:w-[46em] hero-content">
          <div className="md:w-[46em]">
            <div className="text-center text-white">
              <div
                className="overflow-auto relative px-4 pt-9 pb-4 m-auto mb-6 w-[80vw] font-code text-[2vw] leading-[1.5em] text-slate-700 bg-slate-100 rounded-md opacity-0 animate-slide-in-1 md:w-[38em] md:text-sm"
                style={{
                  tabSize: "4ch",
                  fontVariantLigatures: "none",
                  WebkitFontVariantLigatures: "none",
                }}
              >
                <span className="block absolute top-0 right-0 py-1 px-4 font-console text-white uppercase bg-slate-900">
                  editable
                </span>
                <CodeEditor code={code} />
              </div>
              <h1 className="mb-6 font-script text-4xl opacity-0 animate-slide-in-2">
                {pkg.name}
              </h1>
              <p className="mb-6 font-script text-xl opacity-0 animate-slide-in-3">
                {pkg.description}
              </p>
              <p className="opacity-0 animate-slide-in-4">
                <code className="py-2 px-3 font-console text-slate-700 bg-slate-200">
                  $ npm install {pkg.name}@{pkg.version}
                </code>
                <a
                  className="py-2 px-3 font-console bg-slate-900"
                  href={pkg.repository.url.replace(/^git\+|\.git$/g, "")}
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
