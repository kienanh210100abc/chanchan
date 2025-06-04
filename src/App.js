import dayjs from "dayjs";
import { useState, useEffect } from "react";

const loveStartDate = dayjs("2025-05-15");

const generateDayMilestones = (startDate, maxCount) => {
  const milestones = [];
  for (let i = 1; i <= maxCount; i++) {
    milestones.push({
      label: `Kỷ niệm ${i * 100} ngày`,
      date: startDate.add(i * 100, "day"),
    });
  }
  return milestones;
};

const generateYearMilestones = (startDate, maxCount) => {
  const milestones = [];
  for (let i = 1; i <= maxCount; i++) {
    milestones.push({
      label: `Kỷ niệm ${i} năm`,
      date: startDate.add(i, "year"),
    });
  }
  return milestones;
};

const getNextBirthday = (mmdd) => {
  const today = dayjs();
  console.log("today2: ", today);
  
  const thisYear = today.year();
  let birthday = dayjs(`${thisYear}-${mmdd}`);
  
  // Nếu sinh nhật năm nay đã qua hoặc là hôm nay, thì tính sinh nhật năm sau
  if (birthday.isBefore(today, "day") ) {
    birthday = dayjs(`${thisYear + 1}-${mmdd}`);
  }
  
  return {
    label: "Sinh nhật Chanchan",
    date: birthday,
  };
};

const getSpecialDayMessage = () => {
  const today = dayjs();
  const todayFormat = today.format("MM-DD");
  console.log("...", todayFormat);
  const specialDays = {
    "09-09": "🎉 Chúc mừng sinh nhật Chanchan! Chúc em bé của anh tuổi mới luôn xinh đẹp, hạnh phúc, thành công trên mọi dự định của em và iu anh nhiều hơn nhé 🎉",
    "03-08": "🌸 Chúc mừng ngày Quốc tế Phụ nữ 8/3! Chúc Bông Hoa Nhỏ luôn toả sáng rực rỡ, mãi là bông hoa của anh! 🌸",
    "10-20": "👩 Chúc mừng ngày Phụ nữ Việt Nam 20/10! Chúc Chanchan luôn vui vẻ, hạnh phúc bên anh thật lâu nha 👩"
  };
  
  return specialDays[todayFormat] || null;
};

function App() {
  const [currentTime, setCurrentTime] = useState(dayjs());

  // Cập nhật thời gian mỗi giây để theo dõi thay đổi ngày
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000 * 60 * 60); // Cập nhật mỗi giờ để không quá tải
    
    return () => clearInterval(interval);
  }, []);

  const today = currentTime;
  const daysTogether = today.diff(loveStartDate, "day");
  const specialMessage = getSpecialDayMessage();

  const dayMilestones = generateDayMilestones(loveStartDate, 10).map((event) => ({
    ...event,
    daysLeft: event.date.diff(today, "day"),
  }));
  const nextDayMilestone = dayMilestones.find((e) => e.daysLeft >= -3);

  const yearMilestones = generateYearMilestones(loveStartDate, 10).map((event) => ({
    ...event,
    daysLeft: event.date.diff(today, "day"),
  }));
  const nextYearMilestone = yearMilestones.find((e) => e.daysLeft >= -3);

  const birthday = getNextBirthday("09-09");
  birthday.daysLeft = birthday.date.diff(today, "day");

  const upcomingEvents = [
    ...(nextDayMilestone ? [nextDayMilestone] : []),
    ...(nextYearMilestone ? [nextYearMilestone] : []),
    birthday,
  ].sort((a, b) => a.date - b.date);

  return (
    <div style={{ 
      textAlign: "center", 
      padding: 20, 
      fontFamily: "Arial, sans-serif",
      // backgroundImage: "url('/background.png')",
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      minHeight: "100vh"
    }}>
      {specialMessage && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#ff4081",
          color: "white",
          fontWeight: "bold",
          fontSize: "24px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          zIndex: 9999,
          padding: "10px 0",
        }}>
          <div
            style={{
              display: "inline-block",
              paddingLeft: "100%",
              animation: "marquee 15s linear infinite",
            }}
          >
            {specialMessage}
          </div>

          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
          `}</style>
        </div>
      )}
      
      <h1 style={{ color: "rgb(255, 255, 255)", marginBottom: 30, marginTop: specialMessage ? 80 : 0 }}>💕 KA & Chanchan 💕</h1>
      <div style={{
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: 15,
        padding: 20,
        margin: "0 auto",
        maxWidth: 500,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <p style={{ fontSize: 24, color: "#495057", marginBottom: 30 }}>
          Hôm nay là ngày thứ <strong style={{ color: "#d63384" }}>{daysTogether}</strong> mình bên nhau 😍
        </p>
        <p style={{ fontSize: 24, color: "#495057", marginBottom: 30 }}>
         Anh em mình cứ thế thôi, hẹ hẹ hẹ
        </p>

        <h2 style={{ color: "#6f42c1", marginBottom: 20 }}>Và tiếp theo chính là:</h2>
        <div>
          {upcomingEvents.map((event, idx) => (
            <div key={idx} style={{ 
              margin: "15px 0", 
              padding: 15,
              background: "rgba(108, 117, 125, 0.1)",
              borderRadius: 10,
              border: "2px solid #e9ecef"
            }}>
              <div style={{ fontSize: 18, fontWeight: "bold", color: "#495057", marginBottom: 5 }}>
                {event.label}
              </div>
              <div style={{ fontSize: 16, color: "#6c757d" }}>
                {event.daysLeft > 0
                  ? `Còn ${event.daysLeft} ngày (${event.date.format("DD/MM/YYYY")})`
                  : event.daysLeft === 0
                  ? "Là hôm nay 🎉"
                  : `Đã qua ${-event.daysLeft} ngày`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;