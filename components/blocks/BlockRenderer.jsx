"use client";

import dynamic from "next/dynamic";

import CultureAndValues from "../About/CultureAndValues";
import KeyMilestone from "../About/KeyMilestone";
import LeadershipTeam from "../About/LeadershipTeam";
import MissionVision from "../About/MissionVission";
import OurExperts from "../About/OurExperts";
import OurImpact from "../About/OurImpact";
import OurStory from "../About/OurStory";
import OurValues from "../About/OurValues";
import FeatureList from "../Affiliations/FeatureList";
import IntegrationList from "../Affiliations/IntegrationList";
import WhyMatters from "../Affiliations/WhyMatters";
import Banner from "../Banner";
import CareerList from "../Career/CareerList";
import LifeInfoNet from "../Career/LifeInfoNet";
import Value from "../Career/Value";
import WhyWork from "../Career/WhyWork";
import About from "../Home/About";
import Blog from "../Home/Blog";
import HomeSolution from "../Home/HomeSolution";
import IndustryServe from "../Home/IndustryServe";
import Sustainability from "../Home/Sustainability";
import Testimonial from "../Home/Testimonial";
import WhyChoose from "../Home/WhyChoose";
import MoreIndustries from "../industries/MoreIndustries";
import Reason from "../industries/Reason";
import Features from "../solutions/Features";
import MoreSolutions from "../solutions/MoreSolutions";
import UseCases from "../solutions/UseCases";

// Lazy-load logo slider as requested
const LogoSlider = dynamic(() => import("../Home/LogoSlider"), {
  ssr: false,
});

export default function BlockRenderer({ blocks, entities = {}, pageType }) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const name = block?.name;
        const data = block?.attributes?.data || {};

        // HERO / BANNER
        if (name === "carbon-fields/hero-section") {
          const primaryButton = Array.isArray(data.hero_buttons)
            ? data.hero_buttons[0]
            : null;

          return (
            <Banner
              key={`hero-${index}`}
              bannerTopTitle={data.top_title}
              bannerTitle={data.title}
              bannerDescription={data.short_description}
              bannerVideo={data.video_file}
              bannerImage={data.banner_image}
              bannerButtonTitle={primaryButton?.button_text}
              bannerButtonURL={primaryButton?.button_url}
            />
          );
        }

        // CLIENT LIST → LOGO SLIDER (lazy loaded, data from `client` CPT)
        if (name === "carbon-fields/client-list") {
          const rawIds = (data.selected_clients || []).map((item) =>
            typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item
          );
          const clientIds = rawIds.filter((id) => id != null && id !== "").map(Number);
          const clientIdSet = new Set(clientIds);
          const allClients = entities.clients || [];
          const clients =
            clientIdSet.size > 0
              ? allClients.filter(
                  (c) =>
                    clientIdSet.has(Number(c.databaseId)) ||
                    clientIdSet.has(Number(c.clientId))
                )
              : allClients;
          const logos = clients.map((client) => ({
            id: client.id ?? client.databaseId ?? client.clientId,
            icon: client.clientLogo || "/assets/logo/01.png",
            title: client.title,
          }));

          return (
            <LogoSlider key={`client-list-${index}`} logos={logos} title={data.client_list_title} />
          );
        }

        // AFFILIATIONS: Why This Matters (affiliations array: logo, affiliation_title, why_matters)
        if (name === "carbon-fields/affiliations-why-this-matters") {
          const cards = (data.affiliations || data.why_matters_cards || data.cards || []).map((c) => ({
            cardImage: c.logo || c.icon || c.card_image || c.image || "/assets/affiliate/icon-01.svg",
            cardDescription: c.affiliation_title || c.description || c.card_description || c.why_matters || "",
          }));
          return (
            <WhyMatters
              key={`why-matters-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              cards={cards}
            />
          );
        }

        // AFFILIATIONS: Company List (company_list: company_title, description, feature_image, background_color)
        if (name === "carbon-fields/affiliations-company-list") {
          const companies = (data.company_list || data.company_items || data.companies || []).map((c) => ({
            FeatureTitle: c.company_title || c.title || "",
            FeatureDescription: c.description || c.short_description || "",
            FeatureImage: c.feature_image || c.image || c.logo || "/assets/affiliate/feature.png",
            backgroundColor: c.background_color || c.backgroundColor || "#FFFFFF",
          }));
          return (
            <FeatureList
              key={`feature-list-${index}`}
              companies={companies}
            />
          );
        }

        // AFFILIATIONS: Integrations Logos (integration_logos: logo_image; button_text, button_url)
        if (name === "carbon-fields/affiliations-integrations-logos") {
          const inlineLogos = data.integration_logos || data.logos || [];
          const logos = inlineLogos.map((logo, i) => ({
            id: logo._id ?? i,
            src: logo.logo_image || logo.src || logo.url || logo.image || "/assets/brand/toshiba-logo.svg",
            width: 186,
            height: 60,
            alt: logo.alt || logo.title || "Partner",
          }));
          return (
            <IntegrationList
              key={`integration-list-${index}`}
              topTitle={data.top_title}
              title={data.title}
              description={data.short_description}
              logos={logos}
              buttonTitle={data.button_text || data.button_title}
              buttonUrl={data.button_url}
            />
          );
        }

        // CAREER: Why Work Here (career_features: feature_image, feature_title, feature_description)
        if (name === "carbon-fields/career-why-work-here") {
          const features = (data.career_features || []).map((f) => ({
            image: f.feature_image || "",
            title: f.feature_title || "",
            description: f.feature_description || "",
          }));
          return (
            <WhyWork
              key={`career-why-work-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              features={features}
            />
          );
        }

        // CAREER: Core Values (core_values: icon, value_title; button_title, button_url)
        if (name === "carbon-fields/career-core-values") {
          const coreValues = (data.core_values || []).map((v) => ({
            icon: v.icon || "",
            value_title: v.value_title || "",
          }));
          return (
            <Value
              key={`career-values-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              buttonTitle={data.button_title}
              buttonUrl={data.button_url}
              coreValues={coreValues}
            />
          );
        }

        // CAREER: Life at Company (gallery_images: [954,953,952,1386] - image IDs, resolved to URLs)
        if (name === "carbon-fields/career-life-at-company") {
          const mediaIds = (data.gallery_images || []).map(Number).filter(Boolean);
          const mediaMap = (entities.mediaItems || []).reduce((acc, m) => {
            const url = m.sourceUrl || m.mediaItemUrl;
            if (m.databaseId && url) acc[m.databaseId] = url;
            return acc;
          }, {});
          const images = mediaIds.map((id) => mediaMap[id] || "").filter(Boolean);
          return (
            <LifeInfoNet
              key={`career-life-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              galleryImages={images}
            />
          );
        }

        // CAREER: Job List (title, short_description; entities.careers for job listings)
        if (name === "carbon-fields/career-job-list") {
          const careers = entities.careers || [];
          return (
            <CareerList
              key={`career-job-list-${index}`}
              title={data.title}
              shortDescription={data.short_description}
              careers={careers}
            />
          );
        }

        // SOLUTION: Use Cases (use_cases: icon, case_title, short_description)
        if (name === "carbon-fields/solution-use-cases") {
          const useCases = (data.use_cases || []).map((u, i) => ({
            id: u._id ?? i,
            title: u.case_title || "",
            description: u.short_description || "",
            icon: u.icon || "/assets/solutions/station.svg",
          }));
          return (
            <UseCases
              key={`solution-use-cases-${index}`}
              topTitle={data.top_title}
              title={data.title}
              useCases={useCases}
            />
          );
        }

        // SOLUTION: Features (features: icon, feature_title)
        if (name === "carbon-fields/solution-features") {
          const features = (data.features || []).map((f, i) => ({
            id: f._id ?? i,
            title: f.feature_title || "",
            icon: f.icon || "/assets/solutions/window.svg",
          }));
          return (
            <Features
              key={`solution-features-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              features={features}
            />
          );
        }

        // SOLUTION / INDUSTRY: More Features (more_features: feature_image, feature_title, feature_description, slug)
        if (name === "carbon-fields/solution-more-features") {
          const moreFeatures = (data.more_features || []).map((f, i) => ({
            _id: f._id,
            id: f._id ?? i,
            feature_title: f.feature_title || "",
            feature_description: f.feature_description || "",
            feature_image: f.feature_image || "/assets/industries/convenience.png",
            slug: f.slug,
          }));
          if (pageType === "industry") {
            return (
              <MoreIndustries
                key={`solution-more-features-${index}`}
                topTitle={data.top_title}
                title={data.title}
                shortDescription={data.short_description}
                moreFeatures={moreFeatures}
                industries={entities.industries}
              />
            );
          }
          return (
            <MoreSolutions
              key={`solution-more-features-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              moreFeatures={moreFeatures.map((f) => ({ id: f.id, title: f.feature_title, description: f.feature_description, image: f.feature_image }))}
            />
          );
        }

        // INDUSTRIES: Reasons (reasons: icon, reason_title, reason_description)
        if (name === "carbon-fields/industry-reasons") {
          const reasons = (data.reasons || []).map((r, i) => ({
            id: r._id ?? i,
            title: r.reason_title || "",
            description: r.reason_description || "",
            icon: r.icon || "/assets/industries/complex.svg",
          }));
          return (
            <Reason
              key={`industry-reasons-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              reasons={reasons}
            />
          );
        }

        // ABOUT SECTION (data fully comes from block fields)
        if (name === "carbon-fields/home-about-us") {
          return (
            <About
              key={`about-${index}`}
              topTitle={data.top_title}
              title={data.title}
              description={data.short_description}
              buttonTitle={data.button_title}
              buttonUrl={data.button_url}
              clientSays={data.client_says}
              clientImage={data.client_image}
              clientName={data.client_name}
              clientDesignation={data.client_designation}
              featureImage={data.feature_image}
            />
          );
        }

        // PRODUCTS & SOLUTIONS (content comes from block fields)
        // Culture & Values on leadership page uses same block type
        if (name === "carbon-fields/home-product-solutions") {
          const isCultureBlock = (data.top_title || "").toLowerCase().includes("culture");
          if (isCultureBlock) {
            const accordionItems = (data.accordion_items || []).map((a) => ({
              id: a._id || a.accordion_title?.toLowerCase().replace(/\s+/g, "-") || `item-${index}`,
              title: a.accordion_title,
              content: (a.accordion_content || "").replace(/<[^>]+>/g, "").trim(),
            }));
            return (
              <CultureAndValues
                key={`culture-${index}`}
                topTitle={data.top_title}
                title={data.title}
                accordionItems={accordionItems}
                buttonTitle={data.button_title}
                buttonUrl={data.button_url}
                featureImage={data.feature_image}
              />
            );
          }
          return <HomeSolution key={`solutions-${index}`} data={data} />;
        }

        // TEAM LIST (Leadership or Experts - distinguished by top_title)
        if (name === "carbon-fields/team-list") {
          const rawIds = (data.selected_team_members || []).map((item) =>
            typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item
          );
          const teamIds = rawIds.filter((id) => id != null && id !== "").map(Number);
          const teamIdSet = new Set(teamIds);
          const allTeams = entities.teams || [];
          const teams =
            teamIdSet.size > 0
              ? allTeams.filter((t) => teamIdSet.has(Number(t.databaseId)))
              : allTeams;
          const isExperts = (data.top_title || "").toLowerCase().includes("experts");
          const teamMapped = teams.map((t) => {
            const designation = t.clientDesignation || "";
            return {
              id: t.id ?? t.databaseId,
              name: t.title || "",
              title: designation,
              image: t.clientImage || "/assets/about/vilson.png",
              role: designation,
            };
          });

          if (isExperts) {
            return (
              <OurExperts
                key={`experts-${index}`}
                topTitle={data.top_title}
                title={data.title}
                members={teamMapped}
              />
            );
          }
          return (
            <LeadershipTeam
              key={`leadership-${index}`}
              topTitle={data.top_title}
              title={data.title}
              teamMembers={teamMapped}
            />
          );
        }

        // INDUSTRIES (data from industries(first: 6) CPT)
        if (name === "carbon-fields/home-industry-section") {
          const allIndustries = entities.industries || [];
          const industriesMapped = allIndustries.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.excerpt?.replace(/<[^>]+>/g, "")?.trim() || "",
            image: item.featuredImage?.node?.mediaItemUrl || "",
            slug: item.slug,
          }));

          return (
            <IndustryServe
              key={`industry-${index}`}
              header={{
                topTitle: data.top_title,
                title: data.title,
                shortDescription: data.short_description,
              }}
              items={industriesMapped}
            />
          );
        }

        // WHY CHOOSE US (data comes from block fields)
        if (name === "carbon-fields/home-why-choose-us") {
          return (
            <WhyChoose
              key={`why-choose-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              cards={data.why_choose_cards}
            />
          );
        }

        // SUSTAINABILITY (data comes from block fields)
        if (name === "carbon-fields/home-sustainability-section") {
          return (
            <Sustainability
              key={`sustainability-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              buttonTitle={data.button_title}
              buttonUrl={data.button_url}
              bannerImage={data.banner_image}
            />
          );
        }

        // TESTIMONIALS
        if (name === "carbon-fields/home-testimonial-section") {
          const rawIds = (data.selected_testimonials || []).map((item) =>
            typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item
          );
          const testimonialIds = rawIds.filter((id) => id != null && id !== "").map(Number);
          const testimonialIdSet = new Set(testimonialIds);
          const allTestimonials = entities.testimonials || [];
          const testimonials =
            testimonialIdSet.size > 0
              ? allTestimonials.filter((item) =>
                  testimonialIdSet.has(Number(item.databaseId))
                )
              : allTestimonials;
          const testimonialsMapped = testimonials.map((item) => ({
            id: item.id,
            title: item.title,
            content: item.testimonialDescription?.replace(/<[^>]+>/g, "")?.trim() || "",
            image: item.testimonialImage || "",
            logo: item.testimonialLogo || "",
            designation: item.testimonialDesignation || "",
          }));

          return (
            <Testimonial
              key={`testimonial-${index}`}
              items={testimonialsMapped}
              topTitle={data.top_title}
              title={data.title}
              buttonText={data.button_text}
              buttonUrl={data.button_url}
            />
          );
        }

        // INSIGHTS / BLOG
        if (name === "carbon-fields/home-insight-section") {
          const rawIds = (data.selected_posts || []).map((item) =>
            typeof item === "object" ? item?.id ?? item?.value ?? item?.ID : item
          );
          const postIds = rawIds.filter((id) => id != null && id !== "").map(Number);
          const postIdSet = new Set(postIds);
          const allPosts = entities.posts || [];
          const posts =
            postIdSet.size > 0
              ? allPosts.filter((item) => postIdSet.has(Number(item.databaseId)))
              : allPosts;
          const postsMapped = posts.map((item) => ({
                id: item.id,
                title: item.title,
                date: item.date,
                slug: item.slug,
                category: item.categories?.edges?.[0]?.node?.name || "",
                image: item.featuredImage?.node?.mediaItemUrl || "",
              }));

          return (
            <Blog
              key={`insight-${index}`}
              items={postsMapped}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              buttonText={data.button_text}
              buttonUrl={data.button_url}
            />
          );
        }

        // ABOUT PAGE: Mission & Vision
        if (name === "carbon-fields/about-mission-vision") {
          const items = data.mission_vision_items || [];
          return (
            <MissionVision
              key={`mission-vision-${index}`}
              items={items.map((item) => ({
                title: item.title,
                description: item.short_description || "",
              }))}
            />
          );
        }

        // ABOUT PAGE: Our Story
        if (name === "carbon-fields/about-our-story") {
          const cards = (data.story_cards || []).map((c) => ({
            icon: c.icon || "",
            title: c.card_title || "",
          }));
          return (
            <OurStory
              key={`our-story-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              cards={cards}
              featureImage={data.feature_image}
            />
          );
        }

        // ABOUT PAGE: Key Milestones
        if (name === "carbon-fields/about-key-milestones") {
          const milestones = (data.milestones || []).map((m) => ({
            image: m.feature_image,
            title: m.milestone_title,
            description: m.short_description,
          }));
          return (
            <KeyMilestone
              key={`key-milestones-${index}`}
              title={data.title}
              milestones={milestones}
            />
          );
        }

        // ABOUT PAGE: Core Values
        if (name === "carbon-fields/about-core-values") {
          const coreValues = (data.core_values || []).map((v) => ({
            icon: v.icon,
            title: v.value_title,
            description: v.value_description,
          }));
          return (
            <OurValues
              key={`core-values-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              coreValues={coreValues}
              rightIcon={data.right_icon}
              backgroundImage={data.background_image}
              rightTitle={data.right_title}
              rightDescription={data.right_description}
            />
          );
        }

        // ABOUT PAGE: Impact
        if (name === "carbon-fields/about-impact") {
          const impactItems = (data.impact_items || []).map((i) => ({
            title: i.impact_title,
            description: i.impact_description,
          }));
          return (
            <OurImpact
              key={`impact-${index}`}
              topTitle={data.top_title}
              title={data.title}
              shortDescription={data.short_description}
              impactItems={impactItems}
              buttonText={data.button_text}
              buttonLink={data.button_link}
            />
          );
        }

        return null;
      })}
    </>
  );
}
