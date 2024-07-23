"use client";

import { useEffect, useState } from "react";
import LineWrapper from "../components/LineWrapper";

export default function Page() {
    const [currentScores, setCurrentScores] = useState<number[]>([]);

    useEffect(() => {
      const ls = localStorage.getItem("scores");
      if (ls) setCurrentScores(JSON.parse(ls));
    }, []);

    return (
        <div className="p-2 flex flex-col justify-center items-center gap-8 w-full md:w-1/2 lg:w-1/3 mx-auto mt-12 h-screen">
            <h2 className="text-2xl font-bold text-center text-blue-800">Histórico</h2>
            <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2">
                <LineWrapper
                    labels={currentScores.map((c, i) => String(i))}
                    label='# scores salvos'
                    data={currentScores}
                    backgroundColor={["dodgerblue"]}
                    borderColor={[]}
                    borderWidth={1}
                />
            </div>

        </div>
    )
}