import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

export default function LibroDetallado(props: { libro: WithId<LibroModel> }) {
    return (
        <div className="flex flex-row p-5 w-2/3 max-[768px]:w-full max-[768px]:flex-col">
            <div className="flex-none max-[768px]:flex max-[768px]:justify-center">
                <img
                    src={`/img/${props.libro.image}`}
                    alt={props.libro.name}
                    className="w-72 h-auto drop-shadow-2xl"
                />
            </div>
            <div className="flex-grow md:ml-5 max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center">
                <h1 className="text-2xl font-bold">{props.libro.name}</h1>
                <p className="text-l">{props.libro.author}</p>
                <div className="flex flex-wrap mt-2">
                    {props.libro.categories.map((category, index) => (
                        <span
                            key={index}
                            className="bg-indigo-300 rounded-full px-4 py-1 mr-2 mb-2"
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <br />
                <p className="text-xl">{props.libro.opinion}</p>
                <p className="text-md mt-2">{props.libro.description}</p>
            </div>
        </div>
    );
}
