"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Code, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DeveloperPage() {
  const features = [
    {
      icon: Zap,
      title: "Generasi Bertenaga AI",
      description:
        "Menggunakan model AI canggih untuk generasi caption dan hashtag yang cerdas",
    },
    {
      icon: Code,
      title: "Open Source",
      description:
        "Sepenuhnya open source dan tersedia di GitHub untuk kontribusi dan kustomisasi",
    },
    {
      icon: BookOpen,
      title: "Integrasi Mudah",
      description:
        "API endpoint sederhana yang dapat diintegrasikan ke platform atau aplikasi apapun",
    },
  ];

  const apiEndpoints = [
    {
      method: "POST",
      path: "/api/caption",
      description: "Generate caption",
      body: {
        keyword: "string",
        platform: "Instagram | TikTok | Facebook",
        region: "Jogja | Makassar | Medan",
        tone: "Humoris | Religi | Gen-Z",
      },
      response: {
        captions: ["caption1", "caption2", "caption3", "caption4", "caption5"],
      },
    },
    {
      method: "POST",
      path: "/api/hashtag",
      description: "Riset hashtag dan emoji",
      body: {
        keyword: "string",
      },
      response: {
        macro: ["#hashtag1", "#hashtag2"],
        mid: ["#hashtag1", "#hashtag2"],
        micro: ["#hashtag1", "#hashtag2"],
        emoji: ["🔥", "✨"],
        reach: {
          macro: "rentang jangkauan",
          mid: "rentang jangkauan",
          micro: "rentang jangkauan",
        },
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#121212]">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
            Dokumentasi Developer
          </h1>
          <p className="text-lg text-slate-400 text-balance mb-8">
            Tag Temanin adalah platform generasi konten AI open-source. Bangun
            bersama kami dan berkontribusi untuk komunitas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/penebangkayu/tag-temanin.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full sm:w-auto h-11 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold flex items-center justify-center gap-2">
                <Github size={18} />
                <span>Lihat di GitHub</span>
                <ExternalLink size={16} />
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Fitur
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <Icon size={32} className="text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            API Endpoint
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {apiEndpoints.map((endpoint, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-6 flex-col sm:flex-row gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 font-semibold text-sm border border-blue-500/30">
                        {endpoint.method}
                      </span>
                      <code className="text-white font-mono text-sm">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-slate-400">{endpoint.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Request */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm">
                      Request Body
                    </h4>
                    <pre className="p-4 rounded-lg bg-[#0a0a0a] text-slate-300 overflow-x-auto text-xs font-mono border border-[#2a2a2a]">
                      {JSON.stringify(endpoint.body, null, 2)}
                    </pre>
                  </div>

                  {/* Response */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm">
                      Response
                    </h4>
                    <pre className="p-4 rounded-lg bg-[#0a0a0a] text-slate-300 overflow-x-auto text-xs font-mono border border-[#2a2a2a]">
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Setup Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-8"
          >
            Memulai
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-xl font-semibold text-white">
                1. Clone Repository
              </h3>
              <div className="p-4 rounded-lg bg-[#1a1a1a] overflow-x-auto border border-[#2a2a2a]">
                <code className="text-slate-300 font-mono text-sm">
                  git clone https://github.com/penebangkayu/tag-temanin.git
                </code>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-xl font-semibold text-white">
                2. Install Dependencies
              </h3>
              <div className="p-4 rounded-lg bg-[#1a1a1a] overflow-x-auto border border-[#2a2a2a]">
                <code className="text-slate-300 font-mono text-sm">
                  npm install
                </code>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-xl font-semibold text-white">
                3. Set Environment Variables
              </h3>
              <div className="p-4 rounded-lg bg-[#1a1a1a] overflow-x-auto border border-[#2a2a2a]">
                <code className="text-slate-300 font-mono text-sm">
                  GROQ_API_KEY=your_api_key_here
                </code>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-xl font-semibold text-white">
                4. Jalankan Development Server
              </h3>
              <div className="p-4 rounded-lg bg-[#1a1a1a] overflow-x-auto border border-[#2a2a2a]">
                <code className="text-slate-300 font-mono text-sm">
                  npm run dev
                </code>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-linear-to-r from-blue-500/10 to-purple-500/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Berkontribusi?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Kami menyambut kontribusi dari developer di semua level.
            Bergabunglah dengan kami di GitHub dan bantu tingkatkan Tag Temanin!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/penebangkayu/tag-temanin.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full sm:w-auto h-11 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold flex items-center justify-center gap-2">
                <Github size={18} />
                <span>Kontribusi di GitHub</span>
              </Button>
            </a>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-11 border-[#3a3a3a] hover:bg-[#2a2a2a] bg-transparent text-white"
              >
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
