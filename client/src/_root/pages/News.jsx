import React from 'react';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "I Built A Successful Blog In One Year",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
      imageUrl: "https://images.adsttc.com/media/images/54f1/5536/e58e/ce7e/1000/0239/large_jpg/IMG_2786_D.jpg?1425102118",
      timeCreated: "2024-01-01T12:00:00Z"
    },
    {
      id: 2,
      title: "How To Learn Programming Fast",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
      imageUrl: "https://www.1training.org/wp-content/uploads/2015/01/Information-Technology-and-Cloud-Computing-1024x870-e1422276882760-1.jpg",
      timeCreated: "2024-02-01T12:00:00Z"
    },
    {
      id: 3,
      title: "Top 10 JavaScript Frameworks",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
      imageUrl: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Best-Programming-Languages-to-Start-Learning-Today.jpg",
      timeCreated: "2024-03-01T12:00:00Z"
    },
    // Add more news items as needed
  ];

  return (
    <div className="container max-w-[1280px] ">
      <div className="py-12 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Jaunumi
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Uzzini aktuālākos jaunumus IT sfērā
          </p>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-300 w-full mt-8">
          <div className="grid gap-x-8 gap-y-16 pt-10 lg:max-w-none w-full">
            {newsItems.map((newsItem, index) => {
              const date = new Date(newsItem.timeCreated).toLocaleString();

              if (index === 0) {
                return (
                  <article
                    key={newsItem.id}
                    className="flex flex-col items-start justify-between md:col-span-2"
                  >
                    <div className="w-full h-96 bg-center bg-cover rounded-t-box" style={{ backgroundImage: `url(${newsItem.imageUrl})` }}></div>
                    <div className="flex items-center gap-x-4 text-xs mt-4">
                      <time dateTime={date} className="text-gray-500">
                        {date.slice(0, 9)}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-2xl font-semibold leading-8 text-gray-900 group-hover:text-gray-600">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {newsItem.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-4 text-base leading-7 text-gray-600">
                        {newsItem.description}
                      </p>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={newsItem.id}
                  className="flex flex-col items-start justify-between max-w-xl"
                >
                  <div className="w-full h-72 bg-center bg-cover rounded-t-box" style={{ backgroundImage: `url(${newsItem.imageUrl})` }}></div>
                  <div className="flex items-center gap-x-4 text-xs mt-4">
                    <time dateTime={date} className="text-gray-500">
                      {date.slice(0, 9)}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {newsItem.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {newsItem.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
