/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import '@/components/magicui/custom/marquee-custom.scss';
import AI1 from "@/public/AI-gallery/ai-1.jpg";
import AI2 from "@/public/AI-gallery/ai-2.jpg"
import AI3 from "@/public/AI-gallery/ai-3.jpg"
import AI4 from "@/public/AI-gallery/ai-4.jpg"
import AI5 from "@/public/AI-gallery/ai-5.jpg"
import AI6 from "@/public/AI-gallery/ai-6.jpg"
import AI7 from "@/public/AI-gallery/ai-7.jpg"
import AI8 from "@/public/AI-gallery/ai-8.jpg"

const reviews = [
  {
    name: "ChatGPT",
    body: "Mind-Blown by the Precision – This Chat is on Another Level!",
    img: AI1.src,
  },
  {
    name: "Gemini",
    body: "Gemini Just Blew My Mind – Insightful and Lightning Fast!",
    img: AI2.src,
  },
  {
    name: "Gemini`",
    body: "Gemini Just Blew My Mind – Insightful and Lightning Fast!",
    img: AI3.src,
  },
  {
    name: "Gemini1",
    body: "Gemini Just Blew My Mind – Insightful and Lightning Fast!",
    img: AI4.src,
  },
  {
    name: "ChatGPT`",
    body: "Mind-Blown by the Precision – This Chat is on Another Level!",
    img: AI5.src,
  },
  {
    name: "ChatGPT1",
    body: "Mind-Blown by the Precision – This Chat is on Another Level!",
    img: AI6.src,
  },
  {
    name: "ChatGPT2",
    body: "Mind-Blown by the Precision – This Chat is on Another Level!",
    img: AI7.src,
  },
  {
    name: "ChatGPT3",
    body: "Mind-Blown by the Precision – This Chat is on Another Level!",
    img: AI8.src,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
const thirdRow = reviews.slice(0, reviews.length / 2);
const fourthRow = reviews.slice(reviews.length / 2);
// const fifthRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-52 cursor-pointer overflow-hidden rounded-xl border p-2",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "bg-[#fefefe]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {/* <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div> */}
        <img src={img} alt={name} className="rounded-full" />
      </div>
      {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
    </figure>
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex h-[480px] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:480px]">
      <div
        className="flex flex-row items-center gap-0"
        style={{
          transform:
            "translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:15s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:10s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        {/* <Marquee reverse pauseOnHover className="[--duration:15s]" vertical>
          {fifthRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee> */}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

/// Marquee X
const reviewss = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow2 = reviewss.slice(0, reviewss.length / 2);
const secondRow2 = reviewss.slice(reviewss.length / 2);

const ReviewCard2 = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
 
export function MarqueeX() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow2.map((review) => (
          <ReviewCard2 key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow2.map((review) => (
          <ReviewCard2 key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
