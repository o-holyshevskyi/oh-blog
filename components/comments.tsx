'use client';

import { useScript } from "@/app/lib/use-script";
import React, { useEffect, useRef, useState } from "react";

export default function Comments() {
    const comment = useRef(null);

    useScript({
        url: "https://utteranc.es/client.js",
        theme: 'dark-blue',
        issueTerm: "url",
        repo: "o-holyshevskyi/oh-blog",
        ref: comment
    });

    return (
        <div className="w-full">
            <div ref={comment}></div>
        </div>
    )
}
