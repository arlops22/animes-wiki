import Image from 'next/image';
import Link from 'next/link';

interface IProps {
    id: number;
    name: string;
    summary: string;
    imgUrl: string | null;
}

export default function AnimeCard(props: IProps) {
    const { id, name, summary, imgUrl } = props;

    return (
        <Link className="relative group" href={`/animes/${id}`}>
            <Image
                className="min-h-[276px] w-full"
                src={imgUrl || 'https://picsum.photos/seed/jjk/400/600'}
                width={200}
                height={300}
                alt={name}
            />
            <p className="font-bold text-dark-gray-100 text-sm pt-3">{name}</p>
            <div className="group-hover:opacity-100 opacity-0 transition absolute top-0 left-0 w-full h-full">
                <div
                    className="
                        absolute h-full w-full
                        before:content-['']
                        before:absolute before:inset-0
                        before:bg-black/80
                    "
                >
                    <Image
                        className="h-full w-full object-cover"
                        src={imgUrl || 'https://picsum.photos/seed/jjk/400/600'}
                        width={200}
                        height={300}
                        alt={name}
                    />
                </div>
                <div className="relative p-3">
                    <p className="font-bold text-dark-gray-100 text-sm">{name}</p>
                    <p className="text-dark-gray-100 text-xs mt-2">{summary}</p>
                </div>
            </div>
        </Link>
    );
}
