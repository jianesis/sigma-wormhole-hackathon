import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import Image from "next/image";

interface ProjectCardProps {
  project?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ownerName: string;
    ownerImage: string;
    isActive: boolean;
  };
  // For direct props
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  ownerName?: string;
  ownerImage?: string;
  isActive?: boolean;
}

export default function ProjectCard(props: ProjectCardProps) {
  // Use either nested project object or direct props
  const {
    id,
    title,
    description,
    imageUrl,
    ownerName,
    ownerImage,
    isActive
  } = props.project || props;

  return (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-[18px] h-[450px] flex flex-col">
      {/* Project Image */}
      <div className="relative w-full h-[200px]">
        <Image
          src={imageUrl || '/placeholder-image.jpg'}
          alt={title || 'Project image'}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          quality={100}
        />
      </div>

      {/* Project Title and Description */}
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-green-900 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-gray-700">
          {description}
        </CardDescription>
      </CardHeader>

      {/* Project Content - Could include additional details */}
      <CardContent className="space-y-2">
        {/* Add any additional project details here */}
      </CardContent>

      {/* Project Owner Info */}
      <CardFooter className="flex items-center space-x-3 mt-auto">
        <div className="relative h-8 w-8">
          <Image
            src={ownerImage || '/placeholder-avatar.jpg'}
            alt={ownerName || 'Project owner'}
            fill
            className="rounded-full object-cover"
            sizes="32px"
          />
        </div>
        <span className="text-sm text-gray-700 font-medium">
          {ownerName}
        </span>
      </CardFooter>
    </Card>
  );
}