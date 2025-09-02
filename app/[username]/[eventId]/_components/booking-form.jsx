"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/actions/bookings";
import { bookingSchema } from "@/app/lib/validators";
import "react-day-picker/style.css";
import useFetch from "@/hooks/use-fetch";

export default function BookingForm({ event, availability }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);

    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  if (data) {
    return (
      <div className="text-center p-10 border border-gray-600 bg-gray-900/40 backdrop-blur-md rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-white">Booking successful!</h2>
        {data.meetLink && (
          <p className="text-gray-400">
            Join the meeting:{" "}
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD770] hover:text-[#EACBED]"
            >
              {data.meetLink}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-10 border border-gray-600 bg-gray-900/40 backdrop-blur-md rounded-lg shadow-2xl">
      <div className="md:h-96 flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              available: {
                background: "#374151", // bg-gray-700
                color: "white",
                borderRadius: "100%",
              },
              selected: {
                background: "#EACBED", // Primary accent
                color: "black",
              },
            }}
            className="text-white"
            style={{
              "--rdp-accent-color": "#EACBED",
              "--rdp-background-color": "#1F2937", // bg-gray-800
            }}
          />
        </div>
        <div className="w-full h-full md:overflow-scroll no-scrollbar">
          {selectedDate && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[#EACBED]">
                Available Time Slots
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    onClick={() => setSelectedTime(slot)}
                    className={`${
                      selectedTime === slot
                        ? "bg-[#EACBED] text-black hover:bg-[#FFD770]"
                        : "bg-gray-800 text-white border-gray-600 hover:bg-gray-800/70 hover:border-[#EACBED]"
                    }`}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("name")}
              placeholder="Your Name"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#EACBED]"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Your Email"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#EACBED]"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...register("additionalInfo")}
              placeholder="Additional Information"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#EACBED]"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EACBED] text-black hover:bg-[#FFD770] disabled:bg-gray-600"
          >
            {loading ? "Scheduling..." : "Schedule Event"}
          </Button>
        </form>
      )}
    </div>
  );
}
