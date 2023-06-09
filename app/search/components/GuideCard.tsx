import { Category, PRICE, Location, Review } from "@prisma/client";
import Link from "next/link";
import Price from "../../components/Price";
import { calculateReviewRatingAverage } from "../../../utils/calculateReviewRatingAverage";
import Stars from "../../components/Stars";

interface Guide {
    id: number;
    slug: string;
    location: Location;
    name: string;
    main_image: string;
    price: PRICE;
    category: Category;
    reviews: Review[];
}

export default function GuideCard({
    guide,
}: {
    guide: Guide;
}) {

    const renderRatingText = () => {
        const rating = calculateReviewRatingAverage(guide.reviews);

        if(rating > 4) return "Awesome"
        else if (rating <= 4 && rating > 3) return "Good"
        else if (rating <= 3 && rating > 2) return "Average"
        else ""
    };

    return (
            <div className="border-b flex pb-5 ml-4">
                <img src={guide.main_image} alt="" className="w-44 h-36 rounded" />
                <div className="pl-5">
                    <h2 className="text-3xl">{guide.name}</h2>
                    <div className="flex items-start">
                    <div className="flex mb-2">
                        <Stars reviews={guide.reviews} />
                    </div>
                    <p className="ml-2 text-sm">{renderRatingText()}</p>

                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={guide.price} />
                        <p className="mr-4 capitalize">{guide.category.name}</p>
                        <p className="mr-4 capitalize">{guide.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link 
                        href={`/guide/${guide.slug}`}>
                            View more information
                    </Link>
                </div>
            </div>
        </div>
    )
}