import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  count: string;
  image: string;
  icon: LucideIcon;
}

export function CategoryCard({ title, count, image, icon: Icon }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative h-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl translate-y-2 group-hover:translate-y-0 transition-transform">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00A86B] flex items-center justify-center text-white">
              <Icon size={20} />
            </div>
            <h3 className="font-montserrat font-bold text-xl text-white">{title}</h3>
          </div>
          <p className="text-white/80 font-medium text-sm pl-13">
            {count} biens disponibles
          </p>
        </div>
      </div>
    </motion.div>
  );
}
