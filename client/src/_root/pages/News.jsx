import React from 'react';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "I Built A Successful Blog In One Year",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
      imageUrl: "https://images.adsttc.com/media/images/54f1/5536/e58e/ce7e/1000/0239/large_jpg/IMG_2786_D.jpg?1425102118"
    },
    {
      id: 2,
      title: "How To Learn Programming Fast",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
      imageUrl: "https://www.1training.org/wp-content/uploads/2015/01/Information-Technology-and-Cloud-Computing-1024x870-e1422276882760-1.jpg"
    },
    {
      id: 3,
      title: "Top 10 JavaScript Frameworks",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
      imageUrl: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Best-Programming-Languages-to-Start-Learning-Today.jpg"
    },
    // Add more news items as needed
  ];

  return (
    <div className="container max-w-[1280px]">
      <div className="py-12">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Jaunumi
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Uzzini aktuālākos jaunumus IT sfērā
          </p>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-300 w-full mt-8">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((newsItem) => (
              <div key={newsItem.id} className="flex flex-col bg-base-200 rounded-box">
                <div
                  className="bg-center rounded-t-box w-full h-72"
                  style={{ backgroundImage: `url(${newsItem.imageUrl})` }}
                ></div>
                
                <div className="flex flex-col gap-6 p-6 bg-base-300">
                  <a className="link link-hover text-xl font-bold">{newsItem.title}</a>
                  <span>{newsItem.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
