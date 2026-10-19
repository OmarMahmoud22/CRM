require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./Models/User");
const Lead = require("./Models/Lead");

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/crm";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // Seed Users
    const usersToSeed = [
      {
        full_name: "System Admin",
        email: "admin@salescore.com",
        password: "password123",
        role: "admin",
      },
      {
        full_name: "Sarah Team Leader",
        email: "teamleader@salescore.com",
        password: "password123",
        role: "TeamLeader",
      },
      {
        full_name: "Alex Sales Agent",
        email: "agent@salescore.com",
        password: "password123",
        role: "agent",
      },
      {
        full_name: "David Data Entry",
        email: "dataentry@salescore.com",
        password: "password123",
        role: "Dataentry",
      },
    ];

    const seededUsers = {};

    for (const userData of usersToSeed) {
      let existing = await User.findOne({ email: userData.email });
      if (!existing) {
        existing = await User.create(userData);
        console.log(`Created user: ${existing.email} (${existing.role})`);
      } else {
        console.log(`User already exists: ${existing.email} (${existing.role})`);
      }
      seededUsers[userData.role] = existing;
    }

    // Seed Leads
    const sampleLeads = [
      {
        name: "Acme Corporation",
        phone: "+1 (555) 234-5678",
        email: "contact@acmecorp.com",
        source: "FaceBook",
        status: "New",
        Assignto: seededUsers.agent?._id || null,
      },
      {
        name: "Global Logistics Ltd",
        phone: "+1 (555) 876-5432",
        email: "procurement@globallogistics.com",
        source: "Tweeter",
        status: "Contacted",
        Assignto: seededUsers.agent?._id || null,
      },
      {
        name: "Horizon Financials",
        phone: "+1 (555) 345-6789",
        email: "sales@horizonfin.com",
        source: "Inestagram",
        status: "Inteersted",
        Assignto: seededUsers.agent?._id || null,
      },
      {
        name: "Summit Real Estate",
        phone: "+1 (555) 987-6543",
        email: "info@summitreal.com",
        source: "from_your_frind",
        status: "Follow_Up",
        Assignto: seededUsers.agent?._id || null,
      },
      {
        name: "Nexus Technologies",
        phone: "+1 (555) 456-7890",
        email: "leads@nexustech.io",
        source: "FaceBook",
        status: "Won",
        Assignto: seededUsers.agent?._id || null,
      },
      {
        name: "Echo Media Agency",
        phone: "+1 (555) 654-3210",
        email: "hello@echomedia.com",
        source: "Tweeter",
        status: "New",
        Assignto: null,
      },
    ];

    for (const leadData of sampleLeads) {
      const existingLead = await Lead.findOne({ email: leadData.email });
      if (!existingLead) {
        await Lead.create(leadData);
        console.log(`Created lead: ${leadData.name}`);
      } else {
        console.log(`Lead already exists: ${leadData.name}`);
      }
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed with error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

seedDatabase();
