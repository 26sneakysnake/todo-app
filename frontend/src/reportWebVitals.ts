const reportWebVitals = (onPerfEntry: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then((webVitals) => {
      (webVitals as any).getCLS(onPerfEntry);
      (webVitals as any).getFID(onPerfEntry);
      (webVitals as any).getFCP(onPerfEntry);
      (webVitals as any).getLCP(onPerfEntry);
      (webVitals as any).getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;