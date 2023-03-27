import { min } from "underscore";

const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString ) {
    const lyricStrings = lyricString.split("\n")
    const lyricInfos = []
    for (const lyric of lyricStrings ) {
        const res = timeReg.exec(lyric)
        if (!res) continue
        const minute = res[1] * 60 * 1000
        const second = res[2] * 1000 
        const mSecond = res[3].length === 3 ? res[3] * 1 : res[3] * 10 
        const time = minute + second + mSecond
        const text = lyric.replace(timeReg,"")
        if(!text) continue
        lyricInfos.push({ time , text })
    }
    return lyricInfos
}