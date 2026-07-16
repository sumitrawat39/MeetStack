"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const LocalParticipant = useLocalParticipant();
  const router = useRouter();
  const isMeetingOwner =
    LocalParticipant &&
    call?.state.createdBy &&
    LocalParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
      className={'bg-red-500 rounded-xl'}
    >
        End call for eveyone
    </Button>
  );
};

export default EndCallButton;
