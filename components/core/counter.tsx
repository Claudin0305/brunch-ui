import React, { useState, useEffect } from "react";
type Props={
  date_fin: string;
  date_limite: string[];
}
const Counter:React.FC<Props> = ({date_fin, date_limite}) => {
  const [eventTime, setEventTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(date_fin);
    // const target = new Date("03/09/2023 18:59:59");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      if (difference <= 0) {
        setEventTime(false);
        return;
      }
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
      setEventTime(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (

      <section className="text-center">
        {eventTime ? (
          <>
            {/* <h1 className="text-t6 font-bold md:text-t7 mb-4">
              The best event you will never see
            </h1> */}
            <div className={`bg-gradient-to-br from-blue-500 to-blue-slate-900 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8`}>
              <div className="py-4 px-2 mx-auto block md:grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                <p className="col-span-4 text-center uppercase">Temps restant</p>
                <div className="block">
                  <p className="text-2xl font-semibold">{days}</p>
                  <p className="uppercase">jours</p>
                </div>
                <div className="block">
                  <p className="text-2xl font-semibold">{hours}</p>
                  <p className="uppercase">heures</p>
                </div>
                <div className="block">
                  <p className="text-2xl font-semibold">{minutes}</p>
                  <p className="uppercase">minutes</p>
                </div>
                <div className="block">
                  <p className="text-2xl font-semibold">{seconds}</p>
                  <p className="uppercase">secondes</p>
                </div>
              </div>
              <div className="flex flex-col border-t-2 border-l-0 md:border-t-0 md:border-l-2 border-solid border-white py-4 md:py-0 text-center justify-center">
                <p className="uppercase mb-2">date limite</p>
                <p className="text-2xl font-semibold mb-2">{date_limite?.[1]}</p>
                <p className="uppercase">{`${date_limite?.[2]} ${date_limite?.[3]}`}</p>
              </div>
            </div>

          </>
        ) : (
          <h1>Register end!</h1>
        )}
      </section>

  );
};

export default Counter;
