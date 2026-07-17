"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "sonner";

const MeetingTypeList = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const [callDetails, setCallDetails] = useState<Call>();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();

      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      await call.getOrCreate({
        data: {
          starts_at: values.dateTime.toISOString(),
          custom: {
            description:
              values.description || "Scheduled Meeting",
          },
        },
      });

      setCallDetails(call);

      toast.success("Meeting Created");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting");
    }
  };

  const meetingLink = callDetails
    ? `${window.location.origin}/meeting/${callDetails.id}`
    : "";

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />

      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-blue-1"
        handleClick={() => {
          setCallDetails(undefined);
          setMeetingState("isScheduleMeeting");
        }}
      />

      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        className="bg-purple-1"
        handleClick={() => {}}
      />

      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        className="bg-yellow-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />

      {/* CREATE SCHEDULED MEETING */}

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          buttonText="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base text-sky-1">
                Description
              </label>

              <Textarea
                placeholder="Meeting Description"
                value={values.description}
                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({
                    ...values,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base text-sky-1">
                Date & Time
              </label>

              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date:Date|null) => {
                  if (date) {
                    setValues({
                      ...values,
                      dateTime: date,
                    });
                  }
                }}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="w-full rounded-lg bg-dark-2 p-3 text-white outline-none"
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
            setCallDetails(undefined);
          }}
          title="Meeting Created"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Meeting Link Copied");
          }}
        />
      )}

      {/* INSTANT MEETING */}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        className="text-center"
        handleClick={async () => {
          if (!client || !user) return;

          const id = crypto.randomUUID();

          const call = client.call("default", id);

          await call.getOrCreate();

          router.push(`/meeting/${call.id}`);
        }}
      />
    </section>
  );
};

export default MeetingTypeList;