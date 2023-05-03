import React from "react";
import { ReactNode } from "react";
import NavBare from "../core/nav-bare";
import SideBare from "../core/side-bare";
type Props = {
    children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="relative bg-slate-200">
            <div className="flex">
                <SideBare />
                <div className="flex flex-col w-full">
                    <NavBare />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
