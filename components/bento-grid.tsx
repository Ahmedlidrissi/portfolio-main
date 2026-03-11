import { ProjectCard } from './project-card';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Scalable marketplace with real-time inventory',
    techStack: ['Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ'],
    architecture: 'API Gateway → Services → Message Queue',
    healthEndpoint: '/api/health/ecommerce',
    span: 'md:col-span-2',
  },
  {
    id: 2,
    title: 'Analytics Engine',
    description: 'Real-time data processing pipeline',
    techStack: ['Kafka', 'Apache Spark', 'Python'],
    architecture: 'Stream → Processing → Storage',
    span: 'md:col-span-1',
  },
  {
    id: 3,
    title: 'Identity Service',
    description: 'OAuth 2.0 authentication provider',
    techStack: ['Node.js', 'MongoDB', 'JWT'],
    architecture: 'Auth → Session → Verification',
    healthEndpoint: '/api/health/auth',
    span: 'md:col-span-1',
  },
  {
    id: 4,
    title: 'API Gateway',
    description: 'Request routing and rate limiting',
    techStack: ['Go', 'etcd', 'gRPC'],
    healthEndpoint: '/api/health/gateway',
    span: 'md:col-span-2',
  },
  {
    id: 5,
    title: 'Web Dashboard',
    description: 'Interactive analytics and monitoring',
    techStack: ['Next.js', 'TailwindCSS', 'TypeScript'],
    architecture: 'React → SSR → CDN',
    span: 'md:col-span-1',
  },
];

export function BentoGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-50 mb-4">Featured Projects</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Architecting systems that scale. Each project represents a commitment to
            engineering excellence and innovative problem-solving.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className={project.span}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                architecture={project.architecture}
                healthEndpoint={project.healthEndpoint}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
