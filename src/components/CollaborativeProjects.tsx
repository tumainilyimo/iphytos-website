import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaUniversity, FaFlask } from "react-icons/fa";
import { useState, useRef } from "react";

const projects = [
	{
		id: 1,
		title: "Antiviral Drug Discovery",
		partner: "UDOM",
		description:
			"We are implementing a drug discovery project in partnership with the University of Dodoma (UDOM) to discover lead antiviral compounds, emphasizing SARS-COV-2, HIV, and influenza.",
		icon: <FaUniversity className="text-4xl text-primary" />,
		targets: ["SARS-COV-2", "HIV", "Influenza"],
	},
	{
		id: 2,
		title: "Antiviral Drug Discovery",
		partner: "ITM-MUHAS",
		description:
			"In collaboration with ITM-MUHAS we are implementing a project to discover natural products with potential SARS-COV-2 targeting viral cell entry and replication inhibition. We are employing our insilico engine that has successfully nominated candidates for experimental testing.",
		icon: <FaFlask className="text-4xl text-primary" />,
		targets: ["SARS-COV-2", "Viral Cell Entry", "Replication Inhibition"],
	},
];

const GlowingCard = ({ project, index }) => {
	const cardRef = useRef(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e) => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setMousePosition({ x, y });
	};

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.2 }}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="group relative bg-white rounded-xl sm:rounded-2xl p-[2px] overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-br 
                before:from-primary/5 before:via-transparent before:to-primary/10
                before:opacity-0 group-hover:before:opacity-100 before:transition-opacity
                after:absolute after:inset-0 after:bg-gradient-to-tr
                after:from-primary/5 after:via-transparent after:to-primary/10
                after:opacity-0 group-hover:after:opacity-100 after:transition-opacity
                after:blur-xl after:-z-10
                shadow-[0_0_15px_rgba(0,0,0,0.05)]
                group-hover:shadow-[0_0_30px_rgba(0,0,0,0.1),0_0_60px_rgba(0,0,0,0.05)]
                group-hover:shadow-primary/5"
			whileHover={{
				scale: 0.98,
				transition: { duration: 0.3, ease: "easeOut" },
			}}
			style={{
				[`--tw-shadow-color` as string]:
					isHovered
						? `rgba(${Math.min(
								255,
								Math.max(0, Math.floor(mousePosition.x / 3))
						  )}, ${Math.min(
								255,
								Math.max(0, Math.floor(mousePosition.y / 3))
						  )}, 255, 0.1)`
						: "rgba(0, 0, 0, 0.05)",
			} as React.CSSProperties}
		>
			{/* Interactive glow effect */}
			<div
				className="absolute inset-0 pointer-events-none transition-opacity duration-300
                   shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]
                   group-hover:shadow-[inset_0_0_30px_rgba(0,255,255,0.2)]"
				style={{
					background: isHovered
						? `radial-gradient(
            600px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(0, 255, 255, 0.15),
            rgba(0, 255, 0, 0.15),
            rgba(255, 0, 255, 0.15),
            transparent 40%
          )`
						: "none",
					opacity: isHovered ? 1 : 0,
				}}
			/>

			{/* Animated border with enhanced shadow */}
			<div
				className="absolute inset-0 pointer-events-none
                   shadow-[0_0_20px_rgba(0,255,255,0.2)]
                   group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
				style={{
					background: isHovered
						? `conic-gradient(
            from ${Math.atan2(mousePosition.y - 150, mousePosition.x - 150)}rad,
            rgba(0, 255, 255, 0.8),
            rgba(0, 255, 0, 0.8),
            rgba(255, 0, 255, 0.8),
            rgba(0, 255, 255, 0.8)
          )`
						: "none",
					maskImage:
						'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					maskComposite: 'exclude',
					WebkitMaskImage:
						'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					WebkitMaskComposite: 'xor',
					padding: "2px",
					borderRadius: "1rem",
					opacity: isHovered ? 1 : 0,
					transition: "all 0.3s ease",
					filter: "blur(0.5px)",
				}}
			/>

			{/* Card content */}
			<div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 z-10 h-full
                    shadow-[inset_0_0_20px_rgba(0,0,0,0.03)]
                    group-hover:shadow-[inset_0_0_30px_rgba(0,0,0,0.05)]
                    transition-shadow duration-300">
				<div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
					<motion.div
						className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl flex-shrink-0"
						initial={{ rotate: -3 }}
						whileHover={{
							rotate: [0, -10, 10, -5, 5, 0],
							scale: 1.1,
							transition: {
								rotate: {
									duration: 0.6,
									ease: "easeInOut",
									times: [0, 0.2, 0.4, 0.6, 0.8, 1],
								},
								scale: {
									duration: 0.3,
								},
							},
						}}
					>
						{project.icon}
					</motion.div>
					<div>
						<h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
							{project.title}
						</h3>
						<motion.span
							className="inline-block px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium
                         shadow-sm group-hover:bg-primary group-hover:text-white transition-all"
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.2 },
							}}
						>
							{project.partner}
						</motion.span>
					</div>
				</div>

				<p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
					{project.description}
				</p>

				<div className="flex flex-wrap gap-1.5 sm:gap-2">
					{project.targets.map((target, idx) => (
						<span
							key={idx}
							className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm
                       group-hover:bg-primary/10 group-hover:text-primary transition-all cursor-default"
						>
							{target}
						</span>
					))}
				</div>
			</div>

			{/* Ambient light effect */}
			<div
				className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20
                   opacity-0 group-hover:opacity-100 blur-2xl -z-20 transition-opacity duration-500"
				style={{
					transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
				}}
			/>
		</motion.div>
	);
};

const CollaborativeProjects = () => {
	return (
		<section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
					className="text-center mb-10 sm:mb-16"
				>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						whileInView={{ scale: 1, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6 text-sm sm:text-base font-medium"
					>
						<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse" />
						Research Partnerships
					</motion.div>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4 sm:mb-6 px-4 sm:px-0">
						Advancing Science Through
						<span className="relative ml-2 sm:ml-3 block sm:inline">
							<span className="relative z-10 text-primary">Collaboration</span>
							<motion.svg
								initial={{ pathLength: 0 }}
								whileInView={{ pathLength: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 1, delay: 0.5 }}
								className="absolute -bottom-2 left-0 w-full"
								width="100%"
								height="10"
								viewBox="0 0 100 10"
								preserveAspectRatio="none"
							>
								<motion.path
									d="M0,5 C30,5 70,5 100,5"
									fill="none"
									stroke="currentColor"
									className="text-primary/30"
									strokeWidth="4"
								/>
							</motion.svg>
						</span>
					</h2>
					<p className="text-lg text-neutral-dark/80 max-w-2xl mx-auto">
						Working together with leading institutions to advance medical
						research and discovery
					</p>
				</motion.div>

				<div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto px-2 sm:px-4">
					{projects.map((project, index) => (
						<div key={project.id} className="flex flex-col md:flex-row gap-6 sm:gap-8">
							{/* Image Card */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className="relative w-full md:w-1/2 h-[300px] rounded-xl sm:rounded-2xl overflow-hidden group"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 z-10" />
								<div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-20" />
								<motion.div
									className="absolute inset-0 bg-cover bg-center"
									style={{
										backgroundImage: `url(${index === 0 ? '/news-file/109.jpg' : '/news-file/placeholder-user.jpg'})`,
									}}
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
							</motion.div>

							{/* Text Card */}
							<div className="w-full md:w-1/2">
								<GlowingCard project={project} index={index} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CollaborativeProjects;