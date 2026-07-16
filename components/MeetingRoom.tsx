"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutList, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const layouts: {
  label: string;
  value: CallLayoutType;
}[] = [
  {
    label: "Grid",
    value: "grid",
  },
  {
    label: "Speaker Left",
    value: "speaker-left",
  },
  {
    label: "Speaker Right",
    value: "speaker-right",
  },
];

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] =
    useState<CallLayoutType>("speaker-left");

  const [showParticipants, setShowParticipants] =
    useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  const LayoutComponent = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;

      case "speaker-right":
        return (
          <SpeakerLayout participantsBarPosition="left" />
        );

      default:
        return (
          <SpeakerLayout participantsBarPosition="right" />
        );
    }
  };

  return (
    <section className="relative flex h-screen overflow-hidden bg-black text-white">
      {/* Video Layout */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-full w-full max-w-7xl items-center justify-center px-4">
          <LayoutComponent />
        </div>

        {/* Participants Sidebar */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            showParticipants
              ? "w-[320px] opacity-100"
              : "w-0 opacity-0"
          )}
        >
          <div className="h-screen border-l border-gray-700 bg-[#111827]">
            <CallParticipantsList
              onClose={() => setShowParticipants(false)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 rounded-full bg-black/50 px-5 py-3 backdrop-blur-md shadow-lg">
        <CallControls />

        {/* Layout Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-[#19232d] hover:bg-[#4c535b] text-white"
            >
              <LayoutList size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="border-gray-700 bg-[#19232d] text-white"
          >
            <DropdownMenuGroup>
              {layouts.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  className="cursor-pointer"
                  onClick={() => setLayout(item.value)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Stats */}
        <CallStatsButton />

        {/* Participants */}
        <Button
          size="icon"
          variant="secondary"
          onClick={() =>
            setShowParticipants((prev) => !prev)
          }
          className="rounded-full bg-[#19232d] hover:bg-[#4c535b] text-white"
        >
          <Users size={20} />
        </Button>

        
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;