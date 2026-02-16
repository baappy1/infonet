import Testimonial from "@/components/About/Testimonial";
import Banner from "@/components/Banner";
import { BlockRenderer } from "@/components/blocks";
import InfiniteSlider from "@/components/Home/LogoSlider";
import OurImpactSolutions from "@/components/solutions/OurImpactSolutions";
import Benefits from "@/components/service-details/Benefits";
import Include from "@/components/service-details/Include";
import LifeInfoNet from "@/components/service-details/LifeInfoNet";
import MoreServices from "@/components/service-details/MoreServices";
import ProcessDefault from "@/components/service-details/process";
import { client } from "@/lib/graphql/client";
import {
    GET_HOMEPAGE_ENTITIES,
    GET_SERVICE_BLOCKS_BY_SLUG,
    GET_SERVICES_BY_IDS,
    GET_ALL_INDUSTRIES,
} from "@/lib/graphql/queries";

async function getServiceBlocks(slug) {
    try {
        const { data } = await client.query({
            query: GET_SERVICE_BLOCKS_BY_SLUG,
            variables: { slug },
            fetchPolicy: "no-cache",
        });
        const node = data?.services?.nodes?.[0];
        if (node?.blocksJSON) return JSON.parse(node.blocksJSON);
    } catch (error) {
        console.error("Error fetching service blocks:", error);
    }
    return [];
}

function collectIdsFromBlocks(blocks) {
    const clientIds = new Set();
    const testimonialIds = new Set();
    const serviceIds = new Set();
    let needsIndustries = false;

    blocks.forEach((block) => {
        const data = block?.attributes?.data || {};

        if (block?.name === "carbon-fields/client-list") {
            (data.selected_clients || []).forEach((item) => {
                const id =
                    typeof item === "object"
                        ? (item?.id ?? item?.value ?? item?.ID)
                        : item;
                if (id != null && id !== "") clientIds.add(Number(id));
            });
        }

        if (block?.name === "carbon-fields/home-testimonial-section") {
            (data.selected_testimonials || []).forEach((item) => {
                const id =
                    typeof item === "object"
                        ? (item?.id ?? item?.value ?? item?.ID)
                        : item;
                if (id != null && id !== "") testimonialIds.add(Number(id));
            });
        }

        if (block?.name === "carbon-fields/service-life-at-infonet") {
            (data.associated_services || data.selected_services || []).forEach((item) => {
                const id =
                    typeof item === "object"
                        ? (item?.id ?? item?.value ?? item?.ID)
                        : item;
                if (id != null && id !== "") serviceIds.add(Number(id));
            });
        }

        if (block?.name === "carbon-fields/service-more-industries") {
            needsIndustries = true;
        }
    });

    return {
        clientIds: Array.from(clientIds),
        testimonialIds: Array.from(testimonialIds),
        serviceIds: Array.from(serviceIds),
        needsIndustries,
    };
}

async function getServiceEntities(blocks) {
    const { clientIds, testimonialIds, serviceIds, needsIndustries } =
        collectIdsFromBlocks(blocks);

    let clients = [];
    let testimonials = [];
    let associatedServices = [];
    let serviceIndustries = [];

    // Fetch clients + testimonials
    if (clientIds.length > 0 || testimonialIds.length > 0) {
        try {
            const { data } = await client.query({
                query: GET_HOMEPAGE_ENTITIES,
                variables: { clientIds, testimonialIds, postIds: [] },
                fetchPolicy: "no-cache",
            });
            clients = data?.clients?.nodes || [];
            testimonials = data?.testimonials?.nodes || [];
        } catch (error) {
            console.error("Error fetching service entities:", error);
        }
    }

    // Fetch associated services (for LifeInfoNet carousel)
    if (serviceIds.length > 0) {
        try {
            const { data } = await client.query({
                query: GET_SERVICES_BY_IDS,
                variables: { serviceIds },
                fetchPolicy: "no-cache",
            });
            associatedServices = data?.services?.nodes || [];
        } catch (error) {
            console.error("Error fetching associated services:", error);
        }
    }

    // Fetch industries (for MoreServices section)
    if (needsIndustries) {
        try {
            const { data } = await client.query({
                query: GET_ALL_INDUSTRIES,
                fetchPolicy: "no-cache",
            });
            serviceIndustries = data?.industries?.nodes || [];
        } catch (error) {
            console.error("Error fetching industries:", error);
        }
    }

    return { clients, testimonials, associatedServices, serviceIndustries };
}

export default async function ServiceDetails({ params }) {
    const { slug } = await params;
    if (!slug) return null;

    const blocks = await getServiceBlocks(slug);
    const entities = await getServiceEntities(blocks);

    // If blocks found, render dynamically via BlockRenderer
    if (blocks && blocks.length > 0) {
        return <BlockRenderer blocks={blocks} entities={entities} pageType="service" />;
    }

    // Fallback: render static layout when no blocks are returned
    return (
        <>
            <Banner
                bannerTopTitle="[ Services ]"
                bannerImage="/assets/solutions/Car_Refuel.png"
                bannerTitle="Installation & Training Made Simple"
                bannerDescription="We partner with our customers to provide in depth training and resources to ensure the new point-of-sale or fuel management system roll out is a success. "
                bannerButtonTitle="Request a Demo"
                bannerButtonURL="#"
            />
            <Include />
            <InfiniteSlider />
            <Benefits />
            <ProcessDefault />
            <LifeInfoNet />
            <OurImpactSolutions />
            <Testimonial />
            <MoreServices />
        </>
    );
}