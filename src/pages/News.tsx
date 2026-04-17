import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { newsItems, categories } from "../data/newsData";

const News = () => {
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	// Find the first News & Events item
	const featuredNews = newsItems.find((item) => item.category === "News & Events");

	// Filter news items based on category and search query, excluding the featured news
	const filteredNews = newsItems.filter((item) => {
		// Exclude the featured news from the grid
		if (featuredNews && item.id === featuredNews.id) {
			return false;
		}

		const matchesCategory = activeCategory === "All" || item.category.includes(activeCategory);
		const matchesSearch =
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="-mt-20">
			{/* Enhanced Hero Section with Featured News */}
			<section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary-dark to-black pt-32 md:pt-40 pb-16 md:pb-32 text-white overflow-hidden">
				{/* Dynamic mesh gradient background */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]"></div>
				
				{featuredNews && (
					<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30"></div>
						<img
							src={featuredNews.image}
							alt={featuredNews.title}
							className="w-full h-full object-cover opacity-30 scale-105 transform transition-transform duration-10000 hover:scale-110"
							style={{ filter: 'brightness(0.7) contrast(1.2)' }}
						/>
					</div>
				)}
				
				<div className="container-fluid relative z-10">
					<div className="max-w-7xl mx-auto">
						<div className="grid lg:grid-cols-12 gap-8 items-center">
							<motion.div
								className="lg:col-span-5"
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
							>
								<motion.h1 
									className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.2 }}
								>
									News & Events
								</motion.h1>
								<motion.p 
									className="text-xl text-white/90 mb-8 max-w-xl"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.3 }}
								>
									Stay updated with the latest developments, breakthroughs, and events at iPhytos
								</motion.p>
							</motion.div>

							{featuredNews && (
								<motion.div
									className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group"
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.2 }}
								>
									<Link to={`/news/${featuredNews.slug}`} className="block">
										<div className="flex flex-col h-full">
											<div className="mb-4">
												<span className="inline-flex items-center gap-2 text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
													<Calendar size={14} />
													{featuredNews.date}
												</span>
											</div>
											<h2 className="text-2xl md:text-3xl font-bold mb-4">
												{featuredNews.title}
											</h2>
											<p className="text-white/80 mb-6">{featuredNews.excerpt}</p>
											<motion.div
												className="flex items-center text-white font-medium mt-auto"
												whileHover={{ x: 10 }}
												transition={{ duration: 0.2 }}
											>
												Read Full Story <ChevronRight size={20} className="ml-2" />
											</motion.div>
										</div>
									</Link>
								</motion.div>
							)}
						</div>
					</div>
				</div>

				
			</section>

			{/* News Filter Section */}
			<section className="relative py-24 bg-gradient-to-b from-white to-neutral-50">
				<div className="container-fluid">
					<div className="max-w-7xl mx-auto">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
							{/* Category Filter */}
							<div className="flex flex-wrap gap-3">
								{categories.map((category) => (
									<motion.button
										key={category}
										className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
											activeCategory === category
												? "bg-primary text-white shadow-primary/20"
												: "bg-white text-neutral-dark hover:bg-gray-50 hover:shadow-md"
										}`}
										onClick={() => setActiveCategory(category)}
										whileHover={{ y: -2 }}
										whileTap={{ scale: 0.98 }}
									>
										{category}
									</motion.button>
								))}
							</div>

							{/* Search Input */}
							<div className="w-full md:w-auto">
								<div className="relative">
									<input
										type="text"
										placeholder="Search news..."
										className="w-full md:w-64 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-dark/50">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>

						{/* Featured News */}
						{filteredNews.length > 0 && (
							<div className="mb-12">
								<Link to={`/news/${filteredNews[0].slug}`} className="block">
									<motion.div
										className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5 }}
									>
										<div className="grid grid-cols-1 md:grid-cols-2">
											<div className="relative h-72 md:h-[400px] overflow-hidden">
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
												<img
													src={filteredNews[0].image}
													alt={filteredNews[0].title}
													className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
												/>
											</div>
											<div className="p-6 md:p-8 flex flex-col">
												<div className="flex items-center gap-4 mb-3">
													<span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
														{filteredNews[0].category}
													</span>
													<span className="text-neutral-dark/60 text-sm flex items-center">
														<Calendar size={14} className="mr-1" />
														{filteredNews[0].date}
													</span>
												</div>
												<h2 className="text-2xl font-bold text-primary mb-3">
													{filteredNews[0].title}
												</h2>
												<p className="text-neutral-dark/80 mb-6 flex-grow">
													{filteredNews[0].excerpt}
												</p>
												<div className="flex items-center text-primary font-medium">
													Read More <ChevronRight size={16} className="ml-1" />
												</div>
											</div>
										</div>
									</motion.div>
								</Link>
							</div>
						)}

						{/* News Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredNews.slice(1).map((newsItem, index) => (
								<motion.div
									key={newsItem.id}
									className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Link to={`/news/${newsItem.slug}`}>
										<div className="relative h-56 overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
											<img
												src={newsItem.image}
												alt={newsItem.title}
												className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
											/>
										</div>
										<div className="p-6">
											<div className="flex items-center gap-3 mb-3">
												<span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
													{newsItem.category}
												</span>
												<span className="text-neutral-dark/60 text-xs flex items-center">
													<Calendar size={12} className="mr-1" />
													{newsItem.date}
												</span>
											</div>
											<h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">
												{newsItem.title}
											</h3>
											<p className="text-neutral-dark/80 text-sm mb-4 line-clamp-3">
												{newsItem.excerpt}
											</p>
											<div className="flex items-center text-primary text-sm font-medium">
												Read More <ChevronRight size={14} className="ml-1" />
											</div>
										</div>
									</Link>
								</motion.div>
							))}
						</div>

						{/* No Results Message */}
						{filteredNews.length === 0 && (
							<div className="bg-white rounded-xl p-8 text-center shadow-light">
								<h3 className="text-xl font-bold text-primary mb-2">No results found</h3>
								<p className="text-neutral-dark/80">
									Try adjusting your search or filter criteria to find what you're looking for.
								</p>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="py-16 bg-primary/5">
				<div className="container-fluid">
					<div className="max-w-4xl mx-auto text-center">
						<motion.h2
							className="text-3xl font-bold text-primary mb-4"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							Stay Updated
						</motion.h2>
						<motion.p
							className="text-neutral-dark/80 mb-8"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Subscribe to our newsletter to receive the latest news and updates from iPhytos
						</motion.p>
						<motion.div
							className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<input
								type="email"
								placeholder="Enter your email address"
								className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
							<button className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
								Subscribe
							</button>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default News;
