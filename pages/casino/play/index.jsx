import React from "react";
import { useSearchParams } from 'next/navigation'

const PlayGame = () => {
    const searchParams = useSearchParams()
    const url = searchParams.get('url');
    const mgckey = searchParams.get('mgckey');
    const currency = searchParams.get('currency');
    const exit_mode = searchParams.get('exit_mode');
    const home_url = searchParams.get('home_url');
    const hide_info = searchParams.get('hide_info');
    const lang = searchParams.get('lang');
    const copyrights = searchParams.get('copyrights');
    const finalUrl = `${url}&mgckey=${mgckey}&currency=${currency}&exit_mode=${exit_mode}&home_url=${home_url}&hide_info=${hide_info}&lang=${lang}&copyrights=${copyrights}`;
    // console.log(searchParams.get('url'));
    return (
        <div className="col-lg-12">
            <iframe id="inlineFrameExample" title="Casino Game" width="100%" height="500" src={finalUrl}/>
        </div>

    );
};
export default PlayGame;
